import React, {useCallback, useMemo} from 'react'
import {navigate} from 'hookrouter'
import {Header} from '../ui'
import {NoteManager} from '../components/NoteManager'
import {useNotes} from '../models/note'


export type ShowProps = {
    id: string
}

export const Show: React.FC<ShowProps> = ({id}) => {
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
                    <button onClick={() => navigate('/edit/' + id, true)}>Edit</button>
                    <button onClick={note.pinned ? unpin : pin}>{note.pinned ? 'Unpin' : 'Pin'}</button>
                    <button onClick={remove}>Remove</button>
                </Header>
            }
            <NoteManager id={id} readOnly/>
        </div>
    )
}