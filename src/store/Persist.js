import {useEffect} from 'react'
import {useNotes} from '../models/note'

export const Persist = () => {
    const {restoreNotes, saveNotes} = useNotes()

    useEffect(restoreNotes, [restoreNotes])
    useEffect(saveNotes, [saveNotes])

    return ''
}