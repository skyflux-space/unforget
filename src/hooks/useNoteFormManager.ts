import {useEffect, useMemo, useRef} from 'react'
import {
    assoc,
    complement,
    cond,
    converge,
    dissoc,
    equals,
    identity,
    isNil,
    length,
    not,
    pipe,
    prop,
    propOr,
    propSatisfies,
    reject,
    T,
} from 'ramda'
import {useForm, UseFormMethods} from 'react-hook-form'
import {isListNote, Note, NoteHookProps, useNote} from '../models/note'
import {ContentList, getContentType, useNoteContent, UseNoteContentProps} from '../models/content'


export type UseNoteFormManagerProps = NoteHookProps & UseFormMethods & UseNoteContentProps

export const useNoteFormManager = (id: string): UseNoteFormManagerProps => {
    const useNoteProps = useNote(id)
    const {note, update} = useNoteProps
    const useFormProps = useForm({defaultValues: note})
    const {watch, reset} = useFormProps
    const useNoteContentProps = useNoteContent(note)
    const {updateContent} = useNoteContentProps
    const changeRef = useRef<boolean>(false)

    useEffect(() => {
        changeRef.current = true
    }, [note, changeRef])

    const data: Note & { listContent?: ContentList, textContent?: string } = watch()

    useEffect(() => {
        const handledData: Note = pipe(
            cond<typeof data, typeof data>([
                [propSatisfies(complement(isNil), 'listContent'), converge(assoc('content'), [prop('listContent'), identity])],
                [propSatisfies(complement(isNil), 'textContent'), converge(assoc('content'), [prop('textContent'), identity])],
                [propSatisfies(complement(isNil), 'content'), identity],
                [T, assoc('content', [])],
            ]),
            dissoc('textContent') as (value: typeof data) => Omit<typeof data, 'textContent'>,
            dissoc('listContent') as (note: Omit<typeof data, 'textContent'>) => Note,
        )(data)

        if (not(equals(note, handledData))) {
            if (changeRef.current) {
                if (note)
                    reset(assoc(isListNote(note) ? 'listContent' : 'textContent', note.content, note))
            } else {
                if (not(equals(note?.content, handledData.content))) {
                    updateContent(handledData.content!)
                } else
                    update(data)
            }
        }
        changeRef.current = false
    }, [note, data, changeRef, reset, update, updateContent])

    const noteRef = useRef(note)
    if (
        !noteRef.current
        || !note
        || getContentType(noteRef.current.content) !== getContentType(note?.content)
        || (isListNote(note) && isListNote(noteRef.current) && uncheckedLength(note.content) !== uncheckedLength(noteRef.current.content))
    )
        noteRef.current = note

    return useMemo(() => ({
        ...useNoteProps,
        ...useFormProps,
        ...useNoteContentProps,
        note: noteRef.current,
    }), [useNoteProps, useFormProps, useNoteContentProps])
}

const uncheckedLength: (content: ContentList) => number = pipe(reject(propOr(false, 'checked')), length)