import React from 'react'
import {RecoilRoot} from 'recoil'
import {Persist} from './Persist'
import {init} from './init'

export const Store = ({children}) => (
    <RecoilRoot initializeState={init}>
        <Persist/>
        {children}
    </RecoilRoot>
)