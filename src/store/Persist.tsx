import React, {useEffect, useState} from 'react'
import {useNotes} from '../models/note'

export const Persist: React.FC = () => {
    const [loaded, setLoaded] = useState(false)
    const {restoreNotes, saveNotes} = useNotes()

    useEffect(() => {
        restoreNotes()
        setLoaded(true)
    }, [restoreNotes])

    useEffect(() => {
        if (loaded)
            saveNotes()
    }, [saveNotes, loaded])

    return <></>
}