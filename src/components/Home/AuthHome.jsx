import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import allActions from '../../actions/index'
import AllLists from '../Lists/AllLists/AllLists'
import CreateList from '../Lists/CreateList/CreateList'
import './AuthHome.css'

const AuthHome = () => {

    const dispatch = useDispatch()
    const itemAdded = useSelector(state => state.itemAdded)
    const itemAdding = useSelector(state => state.itemAdding)
    
    if (itemAdded)
        setTimeout(() => {
            dispatch(allActions.itemAddedActions.hide())
        }, 2500)
    let itemAddedClasses
        (itemAdded) ?
        itemAddedClasses = 'item-added item-added-showing' :
        itemAddedClasses = 'item-added item-added-hiding'
    
return (
    <div className="account-wrapper flex-grid">
        <AllLists />
        <div className="flex-grid col profile-task-wrapper">
            <CreateList />
        </div>
        <div className={itemAddedClasses}><p>Item Added!</p></div>
    </div>
)
}

export default AuthHome