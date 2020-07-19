import {useEffect} from 'react'
import {saveNotes, useNotes} from '../models/note'

export const Persist = () => {
    const notes = useNotes()

    useEffect(() => saveNotes(notes), [notes])

    return ''
}