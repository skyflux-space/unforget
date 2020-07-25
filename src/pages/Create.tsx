import React, {useEffect} from 'react'
import {useNote} from '../models/note'
import {navigate} from 'hookrouter'


export const Create = () => {
    const {note} = useNote()

    useEffect(() => {
        if(note)
            navigate('/edit/' + note.id, true)
    }, [note])

    return <></>
}