import React, {useCallback, useEffect, useState} from 'react'
import {A} from 'hookrouter'
import {useForm} from 'react-hook-form'
import {useInterval} from 'react-use'
import {createNote, useNotes} from '../models/note'
import {Button, Input, TextArea} from '../ui'
import {Note} from '../models/note/types'


export const Create = () => {
    const [note, setNote] = useState<Note | null>(null)

    const {addNote, replaceNote} = useNotes()

    useEffect(() => {
        if (!note) {
            const note = createNote()
            addNote(note)
            setNote(note)
        }
    }, [addNote, setNote, note])

    const {register, handleSubmit} = useForm()
    const save = useCallback(
        handleSubmit((data: Note) => void (data.id && replaceNote(data))),
        [handleSubmit, replaceNote],
    )

    useInterval(save, 3000)

    return (
        <main style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <header>
                <A href="/">
                    <Button children="<--" onClick={save}/>
                </A>
            </header>
            <form style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <input hidden readOnly name="id" value={note ? note.id : ''} ref={register}/>
                <Input name="title" placeholder="Title..." ref={register}/>
                <TextArea name="content" placeholder="Your note..." ref={register} style={{flex: 1}}/>
            </form>
        </main>
    )
}