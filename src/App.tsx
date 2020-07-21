import React from 'react'
import {useRoutes} from 'hookrouter'
import {Dashboard} from './pages/Dashboard'
import {Create} from './pages/Create'
import {Store} from './store'

const routes = {
    '/': () => <Dashboard/>,
    '/create': () => <Create/>,
}


export const App: React.FC = () => {
    const routeResult = useRoutes(routes)

    return (
        <React.StrictMode>
            <Store>
                {routeResult || <div>Not Found</div>}
            </Store>
        </React.StrictMode>
    )
}