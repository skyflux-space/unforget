import React from 'react'
import {Header} from '../ui'
import {NoteManager} from '../components/NoteManager'


export type ShowProps = {
    id: string
}

export const Show: React.FC<ShowProps> = ({id}) => {
    return (
        <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Header/>
            <NoteManager id={id} readOnly/>
        </div>
    )
}