import React from 'react'
import {A} from 'hookrouter'
import {useNotes} from '../models/note'
import {List, Button, BottomBar, MiniCard} from '../ui'


export const Dashboard: React.FC = () => {
    const {validNotes} = useNotes()

    return (
        <main>
            {/*<List>*/}
                {validNotes.map(note => (
                    <A href={'/note/' + note.id}>
                        <MiniCard note={note} selected={false}/>
                    </A>
                ))}
            {/*</List>*/}
            <BottomBar
                visible={false}
                button={
                    <A href="/create">
                        <Button round>+</Button>
                    </A>
                }
            />
        </main>
    )
}