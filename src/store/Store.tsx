import React from 'react'
import {RecoilRoot, RecoilRootProps} from 'recoil'
import {notes, restoreNotes} from '../models/note'
import {Persist} from './Persist'

type StoreProps = {
    children: React.ReactNode
}

const setInitialNotes: RecoilRootProps['initializeState'] = ({set}) => set(notes, restoreNotes())

export const Store: React.FC<StoreProps> = ({children}) => (
    <RecoilRoot initializeState={setInitialNotes}>
        <Persist/>
        {children}
    </RecoilRoot>
)