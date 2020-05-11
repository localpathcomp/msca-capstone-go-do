import React from 'react'
import { Link } from 'react-router-dom'

import AppVersion from '../AppVersion/AppVersion'
import Copyright from '../Copyright/Copyright'

import './SideDrawer.css'

const SideDrawer = props => {

    let drawerClasses = 'side-drawer'
    if (props.show) {
        drawerClasses = 'side-drawer open'
    }

return (
    <nav className={drawerClasses}>
        <div className="side-drawer-header">
            <div className="side-drawer-version">
                <AppVersion />
            </div>
            <div className="side-drawer-logo">
                <Link to="/">GoDo</Link>
            </div>            
        </div>
        <ul>
            <li>
                <Link to="/register">Create Account</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/forgot-password">Forgot Password</Link>
            </li>
        </ul>
        <div className="side-bar-footer">
            <Copyright />
        </div>
    </nav>
)
}
export default SideDrawer