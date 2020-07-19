import {useCallback, useMemo} from 'react'
import {atom, useRecoilValue, useSetRecoilState} from 'recoil'
import {addNote, filterValidNotes, getNote, removeNote, replaceNote} from './service'


export const notes = atom({
    key: 'notes',
    default: [],
})


export const useNotes = () => {
    const value = useRecoilValue(notes)

    return useMemo(() => filterValidNotes(value), [value])
}


export const useNote = id => {
    const allNotes = useRecoilValue(notes)

    const getThisNote = useCallback(getNote(id), [id])

    return useMemo(() => getThisNote(allNotes), [allNotes, getThisNote])
}


export const useAddNote = () => {
    const setNotes = useSetRecoilState(notes)

    return useCallback(note => setNotes(addNote(note)), [setNotes])
}


export const useRemoveNote = () => {
    const setNotes = useSetRecoilState(notes)

    return useCallback(id => setNotes(removeNote(id)), [setNotes])
}


export const useReplaceNote = () => {
    const setNotes = useSetRecoilState(notes)

    return useCallback(note => setNotes(replaceNote(note)), [setNotes])
}