import React from 'react'
import {RecoilRoot} from 'recoil'
import {Persist} from './Persist'

type StoreProps = {
    children: React.ReactNode
}

export const Store: React.FC<StoreProps> = ({children}) => (
    <RecoilRoot>
        <Persist/>
        {children}
    </RecoilRoot>
)