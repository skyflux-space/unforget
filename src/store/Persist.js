import {useEffect} from 'react'
import {useNotes} from '../models/note'

export const Persist = () => {
    const {saveNotes} = useNotes()

    useEffect(saveNotes, [saveNotes])

    return ''
}