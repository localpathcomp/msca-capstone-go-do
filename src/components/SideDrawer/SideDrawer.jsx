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
                <Link to="/" onClick={ props.sideDrawerClickHandler }>GoDo</Link>
            </div>            
        </div>
        <ul>
            <li>
                <Link to="/list" onClick={ props.sideDrawerClickHandler }>New List</Link>
            </li>
            {(props.loggedIn) ? null :
                <li>
                    <Link to="/register" onClick={props.sideDrawerClickHandler}>Create Account</Link>
                </li>
            }
            {(props.loggedIn) ? null :
                <li>
                    <Link to="/forgot-password" onClick={props.sideDrawerClickHandler}>Forgot Password</Link>
                </li>
            }
            {(props.loggedIn) ? null :
                <li>
                    <Link to="/login" onClick={props.sideDrawerClickHandler}>Login</Link>
                </li>
            }
            {(!props.loggedIn) ? null :
                <li>
                    <Link onClick={() => { props.logoutClickHandler(); props.sideDrawerClickHandler(); }} to="/">Logout</Link>
                </li>
            }
        </ul>
        <div className="side-bar-footer">
            <Copyright />
        </div>
    </nav>
)
}
export default SideDrawer