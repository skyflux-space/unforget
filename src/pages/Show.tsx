import React from 'react'
import {Header} from '../ui'
import {NoteForm} from '../components/NoteForm'


export type ShowProps = {
    id: string
}

export const Show: React.FC<ShowProps> = ({id}) => {
    return (
        <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Header/>
            <NoteForm id={id} readOnly/>
        </div>
    )
}