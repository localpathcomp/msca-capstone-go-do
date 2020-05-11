import React from 'react'

import './DrawerToggleButton.css'

const DrawerToggleButton = props => (
    <div style={{ position: "relative" }}>
        <p className="menu-button-text">MENU</p>
        <button className="toggle-button" onClick={ props.click }>
            <div className="toggle-button-line" />
            <div className="toggle-button-line" />
            <div className="toggle-button-line" />
        </button>
    </div>
)

export default DrawerToggleButton