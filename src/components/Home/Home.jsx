import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import allActions from '../../actions/index'

const Home = (props) => {

    const counter = useSelector(state => state.counter)
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    console.log(counter)
    const user = { name: "Rei" }
    useEffect(() => {
        dispatch(allActions.userActions.setUser(user))
    }, [])
    
    return (
        <div>
            <p>home no auth</p>
            <button onClick={ () => dispatch(allActions.counterActions.increment())}>Count Up</button>
        </div>
    )
}
export default Home