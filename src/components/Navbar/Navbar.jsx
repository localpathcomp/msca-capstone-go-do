import React from 'react'
import { Link } from 'react-router-dom';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import AppVersion from '../AppVersion/AppVersion'
import './Navbar.css'

const Navbar = props => (
    <header className="navbar">
        <nav className="navbar-nav">
            <div>
                <AppVersion />
            </div>
            <div className="navbar-logo">
                <Link to="/">GoDo</Link>
            </div>
            <div className="spacer" />
            <div className="navbar-nav-items">
                <ul>
                    <li>
                        <Link to="/register">Create Account</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </div>
            <div>
                <DrawerToggleButton click={ props.sideDrawerClickHandler } />
            </div>
        </nav>
    </header>
)

export default Navbar