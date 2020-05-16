import React from 'react'
import { useSelector } from 'react-redux'

import RecentLists from '../Lists/RecentLists/RecentLists'
import CreateList from '../Lists/CreateList/CreateList'
import './AuthHome.css'

const AuthHome = props => {
    
    const currentUser = useSelector(state => state.currentUser)
    
    return (
        <div className="account-wrapper flex-grid">
            <RecentLists />
            <div className="flex-grid col profile-task-wrapper">
                <CreateList />
            </div>
        </div>
    )
}

export default AuthHome