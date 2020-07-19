import React from 'react'
import {A} from 'hookrouter'
import {useNotes} from '../models/note'
import {List} from '../ui/List'
import {Button} from '../ui/Button'
import {BottomBar} from '../ui/BottomBar'


export const Dashboard = () => {
    const notes = useNotes()

    return (
        <main>
            <List notes={notes}/>
            <BottomBar
                visible={false}
                button={
                    <A href="/create">
                        <Button children={'+'} round/>
                    </A>
                }
            />
        </main>
    )
}