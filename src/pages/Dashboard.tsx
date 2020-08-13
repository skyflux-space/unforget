import React, {useCallback, useMemo, useState} from 'react'
import {A, navigate} from 'hookrouter'
import {converge, ifElse, includes, map, partition, pipe, propOr, unary} from 'ramda'
import {addNote, Note, removeNote, useNotes, ValidNote} from '../models/note'
import {BottomBar, Button, List, MiniCard} from '../ui'


const goToNote = (id: string) => () => navigate('/note/' + id)

const partitionByPin: (note: ValidNote[]) => [ValidNote[], ValidNote[]] = partition(propOr(false, 'pinned'))

export const Dashboard: React.FC = () => {
    const {validNotes, removeNotes, pinNotes, unpinNotes} = useNotes()

    const sortedNotes = useMemo(() => partitionByPin(validNotes), [validNotes])

    const [selectedNotes, selectNotes] = useState<ValidNote[]>([])

    const toggleSelect = useCallback<(note: Note) => void>(pipe(
        converge(ifElse, map(unary, [includes, removeNote, addNote])),
        selectNotes,
    ), [selectNotes])

    const clearSelection = useCallback(() => selectNotes([]), [selectNotes])

    const removeSelected = useCallback(() => {
        removeNotes(selectedNotes)
        clearSelection()
    }, [removeNotes, selectedNotes, clearSelection])

    const [pinnedSelected] = useMemo(() => partitionByPin(selectedNotes), [selectedNotes])

    const pinSelected = () => {
        pinNotes(selectedNotes)
        clearSelection()
    }

    const unpinSelected = () => {
        unpinNotes(selectedNotes)
        clearSelection()
    }

    return (
        <main>
            {
                sortedNotes.map((notes, i) => (
                    <List key={i} pinned={notes.length > 0 && notes[0].pinned}>
                        {notes.map(note => (
                            <MiniCard
                                note={note}
                                selected={selectedNotes.includes(note)}
                                onSelect={() => toggleSelect(note)}
                                onClick={selectedNotes.length ? () => toggleSelect(note) : goToNote(note.id)}
                                key={note.id}
                                pinned={note.pinned}
                            />
                        ))}
                    </List>
                ))
            }
            <BottomBar
                visible={!!selectedNotes.length}
                button={
                    <A href="/create">
                        <Button round>+</Button>
                    </A>
                }
                left={
                    <>
                        <button onClick={clearSelection}>c</button>
                        <button onClick={removeSelected}>x</button>
                    </>
                }
                right={
                    <button onClick={pinnedSelected.length > 0 ? unpinSelected : pinSelected}>
                        {pinnedSelected.length > 0 ? 'u' : 'p'}
                    </button>
                }
            />
        </main>
    )
}