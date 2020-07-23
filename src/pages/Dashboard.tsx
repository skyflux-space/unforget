import React from 'react'
import {A} from 'hookrouter'
import {useNotes} from '../models/note'
import {List, Button, BottomBar} from '../ui'


export const Dashboard: React.FC = () => {
    const {validNotes} = useNotes()

    return (
        <main>
            <List notes={validNotes}/>
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