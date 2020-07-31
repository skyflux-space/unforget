import React, {useCallback, useState} from 'react'
import {A} from 'hookrouter'
import {Note} from '../models/note/types'
import {addNote, removeNote, useNotes} from '../models/note'
import {BottomBar, Button, List, MiniCard} from '../ui'


export const Dashboard: React.FC = () => {
    const {validNotes, removeNotes} = useNotes()

    const [selectedNotes, selectNotes] = useState<Note[]>([])

    const toggleSelect = useCallback<(note: Note) => void>(pipe(
        converge(ifElse, map(unary, [includes, removeNote, addNote])),
        selectNotes,
    ), [selectNotes])

    const clearSelection = useCallback(() => selectNotes([]), [selectNotes])

    const removeSelected = useCallback(() => {
        removeNotes(selectedNotes)
        clearSelection()
    }, [removeNotes, selectedNotes, clearSelection])

    return (
        <main>
            <List>
                {validNotes.map(note => (
                    <MiniCard
                        note={note}
                        selected={selectedNotes.includes(note)}
                        onSelect={() => toggleSelect(note)}
                        key={note.id}
                    />
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
                    <>
                        <button onClick={clearSelection}>y</button>
                        <button onClick={removeSelected}>x</button>
                    </>
                }
            />
        </main>
    )
}