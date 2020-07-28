import React from 'react'
import {HookRouter, useRoutes} from 'hookrouter'
import {Dashboard} from './pages/Dashboard'
import {Create} from './pages/Create'
import {Store} from './store'
import {Show} from './pages/Show'
import {Edit} from './pages/Edit'


const routes = {
    '/': () => <Dashboard/>,
    '/create': () => <Create/>,
    '/edit/:id': ({id}: HookRouter.QueryParams) => <Edit id={id}/>,
    '/note/:id': ({id}: HookRouter.QueryParams) => <Show id={id}/>,
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