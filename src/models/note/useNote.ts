import {useCallback, useMemo} from 'react'
import {equals} from 'ramda'
import {Note} from './types'
import {useNotes} from './useNotes'
import * as Service from './service'


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