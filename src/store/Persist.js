import {useEffect, useState} from 'react'
import {useNotes} from '../models/note'

export const Persist = () => {
    const [loaded, setLoaded] = useState(false)
    const {restoreNotes, saveNotes} = useNotes()

    useEffect(() => {
        restoreNotes()
        setLoaded(true)
    }, [restoreNotes])

    useEffect(() => {
        if(loaded)
            saveNotes()
    }, [saveNotes, loaded])

    return ''
}