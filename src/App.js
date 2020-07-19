import React from 'react'
import {RecoilRoot} from 'recoil'
import {useRoutes} from 'hookrouter'
import {Dashboard} from './pages/Dashboard'
import {Create} from './pages/Create'

const routes = {
    '/': () => <Dashboard/>,
    '/create': () => <Create/>,
}

export const App = () => {
    const routeResult = useRoutes(routes)

    return (
        <React.StrictMode>
            <RecoilRoot>
                {routeResult || <div>Not Found</div>}
            </RecoilRoot>
        </React.StrictMode>
    )
}