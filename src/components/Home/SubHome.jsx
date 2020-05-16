import React from 'react'
import {
    Route,
    useRouteMatch,
    Switch
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from './Home'
import AuthHome from '../Home/AuthHome'

const SubHome = () => {

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
                <Home />
            </Route>
            <Route path={`${match.path}/*`}>
                <Home />
            </Route>
        </Switch>
    </div>
)
    
}

export default SubHome