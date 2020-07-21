import {useCallback, useMemo} from 'react'
import {atom, useRecoilState} from 'recoil'
import * as Service from './service'
import {Note, ValidNote} from "./types";


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
    removeNote: (note: Note) => void
    saveNotes: () => void
    restoreNotes: () => void
}

export const useNotes = (): NotesUtils => {
    const [value, setValue] = useRecoilState(notes)

    const validNotes = useMemo(() => Service.filterValidNotes(value), [value])

    const getNote = useCallback(id => Service.getNote(id)(value), [value])

    const addNote = useCallback(note => setValue(Service.addNote(note)), [setValue])

    const removeNote = useCallback(id => setValue(Service.removeNote(id)), [setValue])

    const replaceNote = useCallback(note => setValue(Service.replaceNote(note)), [setValue])

    const saveNotes = useCallback(() => Service.saveNotes(value), [value])

    const restoreNotes = useCallback(() => setValue(Service.restoreNotes()), [setValue])

    return {
        notes: value,
        validNotes,
        addNote,
        removeNote,
        getNote,
        replaceNote,
        saveNotes,
        restoreNotes,
    }
}


export const useNote
    : NotesUtils['getNote']
    = id => useNotes().getNote(id)