import React from 'react'
import {Header} from '../ui'
import {NoteManager} from '../components/NoteManager'


export type EditProps = {
    id: string
}

export const Edit: React.FC<EditProps> = ({id}) => {
    return (
        <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Header/>
            <NoteManager id={id}/>
        </div>
    )
}