import React, {useCallback, useState} from 'react'
import {A} from 'hookrouter'
import {Note} from '../models/note/types'
import {addNote, removeNoteById, useNotes} from '../models/note'
import {BottomBar, Button, List, MiniCard} from '../ui'


export const Dashboard: React.FC = () => {
    const {validNotes, removeNotes} = useNotes()

    const [selectedNotes, selectNotes] = useState<Note[]>([])

    const toggleSelect = useCallback((note: Note) => selectNotes(notes => {
        if(!notes.includes(note))
            return addNote(note, notes)

        return removeNoteById(note.id, notes)
    }), [selectNotes])

    const removeSelected = useCallback(() => {
        removeNotes(selectedNotes)
        selectNotes([])
    }, [removeNotes, selectedNotes, selectNotes])

    return (
        <main>
            <List>
                {validNotes.map(note => (
                    <A href={'/note/' + note.id} key={note.id}>
                        <MiniCard
                            note={note}
                            selected={selectedNotes.includes(note)}
                            onSelect={toggleSelect}
                            isSelectMode={!!selectedNotes.length}
                        />
                    </A>
                ))}
            </List>
            <BottomBar
                visible={!!selectedNotes.length}
                button={
                    <A href="/create">
                        <Button round>+</Button>
                    </A>
                }
                left={
                    <button onClick={removeSelected}>x</button>
                }
            />
        </main>
    )
}