import React from 'react'
import {Header} from '../ui'
import {NoteManager} from '../components/NoteManager'


export type EditProps = {
    id: string
}

export const Edit: React.FC<EditProps> = ({id}) => {
    return (
        <div style={{position: 'fixed', height: '100%', width: '100%', display: 'flex', flexDirection: 'column'}}>
            <Header/>
            <NoteManager id={id}/>
        </div>
    )
}