import React, {useCallback, useMemo, useState} from 'react'
import {navigate} from 'hookrouter'
import {converge, ifElse, includes, map, partition, pipe, propOr, unary} from 'ramda'
import {addNote, Note, removeNote, useNotes, ValidNote} from '../models/note'
import {DashboardBottomBar, List, MiniCard} from '../ui'


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
        <main style={{position: 'fixed', height: '100%', width: '100%', overflow: 'auto', background: '#FFDEAD', paddingBottom: '4rem'}}>
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
                            />
                        ))}
                    </List>
                ))
            }
            <DashboardBottomBar
                onUnpinClicked={unpinSelected}
                onPinClicked={pinSelected}
                onRemoveClicked={removeSelected}
                onClearClicked={clearSelection}
                pinned={pinnedSelected.length > 0}
                visible={selectedNotes.length > 0}
            />
        </main>
    )
}