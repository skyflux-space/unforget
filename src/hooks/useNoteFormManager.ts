import {useForm, UseFormMethods} from 'react-hook-form'
import {isListNote, Note, NoteHookProps, useNote} from '../models/note'
import {ContentList, getContentType, isListContent, useNoteContent, UseNoteContentProps} from '../models/content'
import {equals, evolve, F, is, length, not, pipe, propOr, reject, when} from 'ramda'
import {useEffect, useMemo, useRef} from 'react'


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

    const data: Note = watch()

    useEffect(() => {
        if (not(equals(note, data))) {
            if (changeRef.current)
                reset(note)
            else {
                if (not(equals(note?.content, data.content))) {
                    if (isListContent(data.content!))
                        updateContent(data.content!.map(evolve({checked: when(is(Array), F)})))
                    else
                        updateContent(data.content!)
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