import {useEffect, useMemo, useRef} from 'react'
import {
    always,
    assoc,
    complement,
    cond,
    converge,
    dissoc, eqProps,
    equals,
    identity,
    ifElse,
    isNil,
    length,
    not,
    pipe,
    prop,
    propOr,
    propSatisfies,
    reject,
    T,
    when,
} from 'ramda'
import {useForm, UseFormMethods} from 'react-hook-form'
import {isListNote, Note, NoteHookProps, useNote} from '../models/note'
import {ContentList, getContentType, useNoteContent, UseNoteContentProps} from '../models/content'


export type UseNoteFormManagerProps = NoteHookProps & UseFormMethods & UseNoteContentProps

export const useNoteFormManager = (id: string): UseNoteFormManagerProps => {
    const useNoteProps = useNote(id)
    const {note, update} = useNoteProps
    const useFormProps = useForm<FormFields>({defaultValues: noteToFormFields(note)})
    const {watch, reset} = useFormProps
    const useNoteContentProps = useNoteContent(note)
    const {updateContent} = useNoteContentProps
    const changeRef = useRef<boolean>(false)

    useEffect(() => {
        changeRef.current = true
    }, [note, changeRef])

    const data: FormFields = watch()

    useEffect(() => {
        const noteFromFields: Note = formFieldToNote(data)

        if (not(equals(note, noteFromFields))) {
            if (changeRef.current) {
                if (note)
                    reset(noteToFormFields(note))
            } else {
                if (not(eqProps('content', note, noteFromFields))) {
                    updateContent(noteFromFields.content!)
                } else
                    update(noteFromFields)
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


type FormFields = Partial<Note & { listContent: ContentList, textContent: string }>


const noteToFormFields: (note?: Note) => FormFields = pipe(
    when(isNil, always({})),
    converge(assoc, [
        ifElse(isListNote, always('listContent'), always('textContent')),
        prop('content'),
        identity,
    ]),
)


const formFieldToNote: (fields?: FormFields) => Note = pipe(
    when(isNil, always({})),
    cond<FormFields, FormFields>([
        [propSatisfies(complement(isNil), 'content'), identity],
        [propSatisfies(complement(isNil), 'listContent'), converge(assoc('content'), [prop('listContent'), identity])],
        [propSatisfies(complement(isNil), 'textContent'), converge(assoc('content'), [prop('textContent'), identity])],
        [T, assoc('content', [])],
    ]),
    dissoc('textContent') as any,
    dissoc('listContent') as any,
)