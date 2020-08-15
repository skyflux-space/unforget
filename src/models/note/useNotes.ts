import {useCallback, useMemo} from 'react'
import {__, compose, pipe, unary} from 'ramda'
import {useRecoilState} from 'recoil'
import {notes} from './recoil'
import {Note, ValidNote} from './types'
import * as Service from './service'

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
    pinNotes: (notes: Note[]) => void
    unpinNote: (note: Note) => void
    unpinNotes: (notes: Note[]) => void
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

    const unpinNotes = useCallback(
        unary(compose(setValue, Service.unpinAll as (notes: Note[]) => (allNotes: Note[]) => Note[])),
        [setValue],
    )

    const pinNotes = useCallback(
        unary(compose(setValue, Service.pinAll as (notes: Note[]) => (allNotes: Note[]) => Note[])),
        [setValue],
    )

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
        pinNotes,
        unpinNotes,
    }
}