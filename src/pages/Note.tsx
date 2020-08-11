import React, {useEffect} from 'react'
import {navigate} from 'hookrouter'
import {useNote} from '../models/note'
import {useNoteFormManager} from '../hooks/useNoteFormManager'
import {Header, NoteForm} from '../ui'


export type NoteProps = {
    id: string
    readOnly?: boolean
}

export const Note: React.FC<NoteProps> = ({id, readOnly = false}) => {
    const {note, remove, pin, unpin} = useNote(id)
    const {handleSubmit, register, filterEmptyListItems, addItemToList, removeListItem, convert} = useNoteFormManager(id)

    useEffect(() => {
        if (!note)
            navigate('/', true)
    }, [note])

    return (
        <div style={{position: 'fixed', height: '100%', width: '100%', display: 'flex', flexDirection: 'column'}}>
            {note && (
                <>
                    <Header>
                        {readOnly && <button onClick={() => navigate('/note/edit/' + id, true)}>Edit</button>}
                        <button onClick={note.pinned ? unpin : pin}>{note.pinned ? 'Unpin' : 'Pin'}</button>
                        <button onClick={remove}>Remove</button>
                    </Header>
                    <NoteForm
                        readOnly={readOnly}
                        note={note}
                        onSubmit={handleSubmit(console.log)}
                        createRef={register}
                        onListFieldBlur={filterEmptyListItems}
                        onListStaticInputChange={addItemToList}
                        onListFieldRemoved={removeListItem}
                        onContentTypeChanged={convert}
                    />
                </>
            )}
        </div>
    )
}