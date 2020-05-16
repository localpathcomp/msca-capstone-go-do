import React from 'react'
import {
    Route,
    useRouteMatch,
    Switch
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import AuthHome from '../Home/AuthHome'
import Login from './Login'

const SubLogin = () => {

    const { loggedIn } = useSelector(state => state.currentUser)

    let match = useRouteMatch()

 return loggedIn ?  (
    <div>
         <Switch>
            <Route path={`${match.path}`}>
                <AuthHome />
            </Route>
            <Route path={`${match.path}/*`}>
                <AuthHome />
            </Route>
        </Switch>
    </div>
) : (
    <div>
        <Switch>
            <Route path={`${match.path}`}>
                <Login />
            </Route>
            <Route path={`${match.path}/*`}>
                <Login />
            </Route>
        </Switch>
    </div>
)
    
}

export default SubLogin