import {useCallback, useMemo} from 'react'
import {equals} from 'ramda'
import {useLatest} from 'react-use'
import {Note} from './types'
import {useNotes} from './useNotes'
import * as Service from './service'


export type NoteHookProps = {
    note?: Note
    update: (newNote: ((note: Note) => Partial<Note>) | Partial<Note>) => void
    remove: () => void
    pin: () => void
    unpin: () => void
}

export const useNote = (id?: string): NoteHookProps => {
    const {replaceNote, getNote, removeNote, pinNote, unpinNote} = useNotes()

    const note = useMemo(() => id !== undefined ? getNote(id) : undefined, [getNote, id])
    const latestNote = useLatest(note)

    const update: NoteHookProps['update'] = useCallback(newNote => {
        const {current: note} = latestNote
        if (!note)
            return

        if (typeof newNote === 'function')
            return update(newNote(note))

        if (newNote && !equals(newNote, note) && (!Service.isIdentifiable(newNote) || newNote.id === note.id)) {
            const fullNewNote = {...note, ...newNote, id: note.id}

            if (!equals(note, fullNewNote))
                replaceNote(fullNewNote)
        }
    }, [replaceNote, latestNote])

    const remove = useCallback(() => {
        if (latestNote.current)
            removeNote(latestNote.current)
    }, [latestNote, removeNote])

    const pin = useCallback(() => latestNote.current && pinNote(latestNote.current), [latestNote, pinNote])

    const unpin = useCallback(() => latestNote.current && unpinNote(latestNote.current), [latestNote, unpinNote])

    return {
        note,
        update,
        pin,
        unpin,
        remove,
    }
}