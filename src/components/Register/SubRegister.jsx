import React from 'react'
import {
    Route,
    useRouteMatch,
    Switch
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import AccountVerified from './AccountVerified'
import AccountVerify from './AccountVerify'
import AuthHome from '../Home/AuthHome'
import Register from './Register'

const SubRegister = () => {

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
            <Route path={`${match.path}/account-verified`}>
                <AccountVerified />
            </Route>
            <Route path={`${match.path}/account-verify`}>
                <AccountVerify />
            </Route>
            <Route exact path={`${match.path}`}>
                <Register />
            </Route>
            <Route exact path={`${match.path}/*`}>
                <Register />
            </Route>
        </Switch>
    </div>
)
    
}

export default SubRegister