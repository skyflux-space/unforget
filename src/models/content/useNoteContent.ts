import {useCallback} from 'react'
import {
    apply,
    applyTo,
    binary,
    defaultTo,
    flip,
    ifElse,
    is,
    nthArg,
    objOf,
    pair,
    pipe,
    remove,
    unary,
    when,
} from 'ramda'
import {isIdentifiable, Note, useNote} from '../note'
import {addItem, convertTo, filterEmptyItems, isListContent, sortListByChecked} from './service'
import {Content, ContentList, ContentType} from './types'


export type UseNoteContentProps = {
    content?: Content
    updateContent: (content: ((content: Content) => Content) | Content) => void
    convert: (type: ContentType) => void
    filterEmptyListItems: () => void
    removeListItem: (i: number) => void
    addItemToList: (text: string) => void
}

export const useNoteContent = (noteOrId?: string | Note): UseNoteContentProps => {
    const {note, update} = useNote(isIdentifiable(noteOrId) ? noteOrId.id : noteOrId)
    const content = note?.content

    const updateContent: UseNoteContentProps['updateContent'] = useCallback(
        pipe(
            when(is(Function), applyTo(defaultTo('', content))),
            when(isListContent, sortListByChecked),
            objOf('content'),
            update,
        ),
        [update, content],
    )

    const convert = useCallback(pipe(
        convertTo as (type: ContentType) => (content: Content) => Content,
        updateContent as (updater: (content: Content) => Content) => void,
    ), [updateContent])

    const filterEmptyListItems = useCallback(() => updateContent(when(isListContent, filterEmptyItems as any)), [updateContent])

    const removeListItem = useCallback(pipe(flip(remove)(1) as any, pair(isListContent), apply(when as any), updateContent), [updateContent])

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