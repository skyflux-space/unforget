import React from 'react'
import {Header} from '../ui'
import {NoteForm} from '../components/NoteForm'


export type EditProps = {
    id: string
}

export const Edit: React.FC<EditProps> = ({id}) => {
    return (
        <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Header/>
            <NoteForm id={id}/>
        </div>
    )
}