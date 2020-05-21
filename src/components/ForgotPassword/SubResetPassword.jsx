import React from 'react'
import {
    Route,
    useRouteMatch,
    Switch
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import AuthHome from '../Home/AuthHome'
import ResetPassword from './ResetPassword'

const SubResetPassword = () => {

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
            <Route path={`${match.path}/:link`}>
                <ResetPassword />
            </Route>
            <Route path={`${match.path}/*`}>
                <ResetPassword />
            </Route>
        </Switch>
    </div>
)
    
}

export default SubResetPassword