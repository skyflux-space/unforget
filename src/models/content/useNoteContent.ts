import {useCallback} from 'react'
import {
    always,
    binary,
    call, converge,
    equals,
    identity,
    ifElse,
    is,
    nthArg, objOf,
    pipe,
    prop, propOr,
    reject,
    unary,
    useWith,
    when,
} from 'ramda'
import {isIdentifiable, Note, useNote} from '../note'
import {addItem, convertTo, filterEmptyItems, isListContent} from './service'
import {Content, ContentList, ContentType} from './types'


export type UseNoteContentProps = {
    content?: Content
    updateContent: (content: ((content: Content) => Content) | Content) => void
    convert: (type: ContentType) => void
    filterEmptyListItems: () => void
    removeListItem: (i: number | string) => void
    addItemToList: (text: string) => void
}

export const useNoteContent = (noteOrId?: string | Note): UseNoteContentProps => {
    const {note, update} = useNote(isIdentifiable(noteOrId) ? noteOrId.id : noteOrId)
    const content = note?.content

    const updateContent: UseNoteContentProps['updateContent'] = useCallback(
        pipe(
            ifElse(
                is(Function),
                useWith(call, [identity, propOr('', 'content')]),
                identity,
            ),
            converge(pipe, [identity, always(objOf('content'))]),
            update,
        ),
        [update],
    )

    const convert = useCallback(pipe(
        convertTo as (type: ContentType) => (content: Content) => Content,
        updateContent as (updater: (content: Content) => Content) => void,
    ), [updateContent])

    const filterEmptyListItems = useCallback(() => updateContent(when(isListContent, filterEmptyItems as any)), [updateContent])

    const removeListItem = useCallback(pipe(
        ifElse(
            pipe(nthArg(1), isListContent),
            useWith(reject, [pipe(Number, useWith(equals, [identity, pipe(prop('index'), Number)])), identity]),
            nthArg(1),
        ),
        updateContent,
    ), [updateContent])

    const addItemToList = useCallback(unary(pipe(
        ifElse(
            binary(pipe(nthArg(1), isListContent)),
            addItem as (text: string, list: ContentList) => ContentList,
            nthArg(1),
        ),
        updateContent,
    )), [updateContent])

    return {
        updateContent,
        convert,
        filterEmptyListItems,
        removeListItem,
        addItemToList,
        content,
    }
}