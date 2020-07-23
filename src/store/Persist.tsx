import React, {useEffect, useState} from 'react'
import {useDebounce} from 'react-use'
import {useNotes} from '../models/note'

export const Persist: React.FC = () => {
    const [loaded, setLoaded] = useState(false)
    const {restoreNotes, saveNotes} = useNotes()

    useEffect(() => {
        restoreNotes()
        setLoaded(true)
    }, [restoreNotes])

    useDebounce(() => {
        if (loaded)
            saveNotes()
    }, 5000,[saveNotes, loaded])

    return <></>
}