import React, {useCallback, useEffect} from 'react'
import {navigate} from 'hookrouter'
import {useNote} from '../models/note'
import {useNoteFormManager} from '../hooks/useNoteFormManager'
import {Button, Header, NoteForm, Icon} from '../ui'


export type NoteProps = {
    id: string
    readOnly?: boolean
}

export const Note: React.FC<NoteProps> = ({id, readOnly = false}) => {
    const {remove, pin, unpin} = useNote(id)
    const {note, handleSubmit, register, filterEmptyListItems, addItemToList, removeListItem, convert} = useNoteFormManager(id)

    useEffect(() => {
        if (!note)
            navigate('/', true)
    }, [note])

    const submit = useCallback(handleSubmit(console.log), [handleSubmit])

    return (
        <div style={{
            position: 'fixed',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'blanchedalmond'
        }}>
            {note && (
                <>
                    <Header>
                        <Button full onClick={() => navigate(`/note/${readOnly ? 'edit/' : ''}` + id, true)}>
                            <Icon icon={readOnly ? 'edit' : 'read'}/>
                        </Button>
                        <Button full onClick={note.pinned ? unpin : pin}>
                            <Icon icon={note.pinned ? 'unpin' : 'pin'} active={note.pinned}/>
                        </Button>
                        <Button full onClick={remove}>
                            <Icon icon="remove"/>
                        </Button>
                    </Header>
                    <NoteForm
                        readOnly={readOnly}
                        note={note}
                        onSubmit={submit}
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