import React, {useEffect, useMemo, useState} from 'react'
import {navigate} from 'hookrouter'
import {createNote, useNotes} from '../models/note'


export const Create = () => {
    const note = useMemo(createNote, [])
    const {addNote} = useNotes()
    const [added, setAdded] = useState(false)

    useEffect(() => {
        if(!added) {
            addNote(note)
            setAdded(true)
        }
    }, [note, setAdded, added, addNote])

    useEffect(() => {
        if (added)
            navigate('/note/edit/' + note.id, true)
    }, [added, note])

    return <></>
}