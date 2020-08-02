import React, {useCallback, useMemo} from 'react'
import {Header} from '../ui'
import {NoteManager} from '../components/NoteManager'
import {useNotes} from '../models/note'
import {navigate} from 'hookrouter'


export type EditProps = {
    id: string
}

export const Edit: React.FC<EditProps> = ({id}) => {
    const {pinNote, unpinNote, getNote, removeNote} = useNotes()
    const note = useMemo(() => getNote(id), [getNote, id])
    const pin = useCallback(() => note && pinNote(note), [note, pinNote])
    const unpin = useCallback(() => note && unpinNote(note), [note, unpinNote])
    const remove = useCallback(() => {
        if(note)
            removeNote(note)
        navigate('/', true)
    }, [note, removeNote])

    return (
        <div style={{position: 'fixed', height: '100%', width: '100%', display: 'flex', flexDirection: 'column'}}>
            {note &&
                <Header>
                    <button onClick={note.pinned ? unpin : pin}>{note.pinned ? 'Unpin' : 'Pin'}</button>
                    <button onClick={remove}>Remove</button>
                </Header>
            }
            <NoteManager id={id}/>
        </div>
    )
}