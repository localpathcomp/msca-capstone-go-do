import React from 'react'

import './AppVersion.css'

const AppVersion = () => (
    <p className="app-version">v { process.env.REACT_APP_VERSION }</p>
)

export default AppVersion