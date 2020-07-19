import {useCallback, useMemo} from 'react'
import {atom, useRecoilState} from 'recoil'
import * as Service from './service'


export const notes = atom({
    key: 'notes',
    default: [],
})


export const useNotes = () => {
    const [value, setValue] = useRecoilState(notes)

    const allNotes = useMemo(() => Service.filterValidNotes(value), [value])

    const getNote = useCallback(id => Service.getNote(id)(value), [value])

    const addNote = useCallback(note => setValue(Service.addNote(note)), [setValue])

    const removeNote = useCallback(id => setValue(Service.removeNote(id)), [setValue])

    const replaceNote = useCallback(note => setValue(Service.replaceNote(note)), [setValue])

    const saveNotes = useCallback(() => Service.saveNotes(value), [value])

    const restoreNotes = useCallback(() => setValue(Service.restoreNotes()), [setValue])

    return {
        notes: allNotes,
        addNote,
        removeNote,
        getNote,
        replaceNote,
        saveNotes,
        restoreNotes,
    }
}


export const useNote = id => {
    const {getNote} = useNotes()

    return useMemo(() => getNote(id), [getNote])
}