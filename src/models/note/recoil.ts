import {useCallback, useEffect, useMemo, useState} from 'react'
import {__, equals, pipe} from 'ramda'
import {atom, useRecoilState} from 'recoil'
import * as Service from './service'
import {Note, ValidNote} from './types'


export const notes = atom<Note[]>({
    key: 'notes',
    default: [],
})

export interface NotesUtils {
    notes: Note[]
    validNotes: ValidNote[]
    getNote: (id: string) => Note | undefined
    addNote: (note: Note) => void
    replaceNote: (note: Note) => void
    removeNoteById: (id: string) => void
    saveNotes: () => void
    restoreNotes: () => void
    removeNotes: (notesToRemove: Note[]) => void
    removeNote: (note: Note) => void
    pinNote: (note: Note) => void
    unpinNote: (note: Note) => void
}

export const useNotes = (): NotesUtils => {
    const [value, setValue] = useRecoilState(notes)

    const validNotes = useMemo(() => Service.filterValidNotes(value), [value])

    const getNote = useCallback(Service.getNote(__, value), [value])

    const addNote = useCallback(note => setValue(Service.addNote(note)), [setValue])

    const removeNoteById = useCallback(id => setValue(Service.removeNoteById(id)), [setValue])

    const removeNotes = useCallback(notes => setValue(Service.removeNotes(notes)), [setValue])

    const removeNote = useCallback(note => setValue(Service.removeNote(note)), [setValue])

    const replaceNote = useCallback(note => setValue(Service.replaceNote(note)), [setValue])

    const saveNotes = useCallback(() => Service.saveNotes(value), [value])

    const restoreNotes = useCallback(() => setValue(Service.restoreNotes()), [setValue])

    const pinNote = useCallback(pipe(
        Service.pin,
        Service.replaceNote as (note: Note) => (notes: Note[]) => Note[],
        setValue,
    ), [setValue])

    const unpinNote = useCallback(pipe(
        Service.unpin,
        Service.replaceNote as (note: Note) => (notes: Note[]) => Note[],
        setValue,
    ), [setValue])

    return {
        notes: value,
        validNotes,
        addNote,
        removeNoteById,
        getNote,
        replaceNote,
        saveNotes,
        restoreNotes,
        removeNotes,
        removeNote,
        pinNote,
        unpinNote,
    }
}


export type NoteHookProps = {
    note?: Note
    update: (newNote?: Partial<Note>) => void
}

export const useNote = (id?: string): NoteHookProps => {
    const [note, setNote] = useState<Note | undefined>()
    const {addNote, replaceNote, getNote} = useNotes()

    const update = useCallback((newNote?: Partial<Note>) => setNote(note => {
        if(!newNote || newNote === note || equals(newNote, note))
            return note

        if(!note && Service.isIdentifiable(newNote))
            return newNote

        if(note && newNote.id !== undefined && note.id !== newNote.id)
            return note

        if(note) {
            const fullNewNote = {...note, ...newNote, id: note.id}
            return equals(note, fullNewNote) ? note : fullNewNote
        }
    }), [setNote])

    useEffect(() => {
        if(note) {
            const oldNote = getNote(note.id)
            if(!oldNote)
                return addNote(note)

            if(oldNote !== note)
                return replaceNote(note)
        }
    }, [note, getNote, addNote, replaceNote])

    useEffect(() => {
        if(!note)
            update(id ? getNote(id) : Service.createNote())
    }, [update, note, id, getNote])

    return {
        note,
        update,
    }
}