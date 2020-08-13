import React, {useEffect} from 'react'
import {useNotes} from '../models/note'

export const Persist: React.FC = () => {
    const {saveNotes} = useNotes()

    useEffect(() => {
        saveNotes()
    }, [saveNotes])

    return <></>
}