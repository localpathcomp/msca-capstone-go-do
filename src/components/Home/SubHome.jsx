import React from 'react'
import {
    Route,
    useRouteMatch,
    Switch
} from 'react-router-dom'

import Home from './Home'
import AuthHome from '../Home/AuthHome'

const SubHome = props => {
    
    let match = useRouteMatch()
    
 return props.loggedIn ?  (
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