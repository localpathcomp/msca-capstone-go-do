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
                <Link to="/" onClick={ props.click }>GoDo</Link>
            </div>            
        </div>
        <ul>
            <li>
                <Link to="/register" onClick={ props.click }>Create Account</Link>
            </li>
            <li>
                <Link to="/login" onClick={ props.click }>Login</Link>
            </li>
            <li>
                <Link to="/forgot-password" onClick={ props.click }>Forgot Password</Link>
            </li>
        </ul>
        <div className="side-bar-footer">
            <Copyright />
        </div>
    </nav>
)
}
export default SideDrawer