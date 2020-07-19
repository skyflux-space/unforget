import React from 'react'
import {RecoilRoot} from 'recoil'
import {Persist} from './Persist'

export const Store = ({children}) => (
    <RecoilRoot>
        <Persist/>
        {children}
    </RecoilRoot>
)