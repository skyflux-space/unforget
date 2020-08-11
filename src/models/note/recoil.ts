import {useCallback, useMemo} from 'react'
import {__, compose, equals, pipe, unary} from 'ramda'
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


export type NoteHookProps = {
    note?: Note
    update: (newNote: ((note: Note) => Note) | Partial<Note>) => void
    remove: () => void
    pin: () => void
    unpin: () => void
}

export const useNote = (id?: string): NoteHookProps => {
    const {replaceNote, getNote, removeNote, pinNote, unpinNote} = useNotes()

    const note = useMemo(() => id !== undefined ? getNote(id) : undefined, [getNote, id])

    const update: NoteHookProps['update'] = useCallback(newNote => {
        if (!note)
            return

        if (typeof newNote === 'function')
            return update(newNote(note))

        if (newNote && !equals(newNote, note) && (!Service.isIdentifiable(newNote) || newNote.id === note.id)) {
            const fullNewNote = {...note, ...newNote, id: note.id}

            if (!equals(note, fullNewNote))
                replaceNote(fullNewNote)
        }
    }, [replaceNote, note])

    const remove = useCallback(() => {
        if (note)
            removeNote(note)
    }, [note, removeNote])

    const pin = useCallback(() => note && pinNote(note), [note, pinNote])

    const unpin = useCallback(() => note && unpinNote(note), [note, unpinNote])

    return {
        note,
        update,
        pin,
        unpin,
        remove,
    }
}