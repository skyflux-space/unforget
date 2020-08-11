import {useForm, UseFormMethods} from 'react-hook-form'
import {Note, NoteHookProps, useNote} from '../models/note'
import {useNoteContent, UseNoteContentProps} from '../models/content'
import {equals, not} from 'ramda'
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
                if (not(equals(note?.content, data.content)))
                    updateContent(data.content!)
                else
                    update(data)
            }
        }
        changeRef.current = false
    }, [note, data, changeRef, reset, update, updateContent])

    return useMemo(() => ({
        ...useNoteProps,
        ...useFormProps,
        ...useNoteContentProps,
    }), [useNoteProps, useFormProps, useNoteContentProps])
}