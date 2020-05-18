import React, { useState, useEffect } from 'react'
/* import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios' */
import { nanoid } from 'nanoid'

//import AllListsSingle from './AllListsSingle'
import './AllLists.css'
/* import allActions from '../../../actions/index'
import { useEffect } from 'react' */

const AllLists = () => {

    /* const [appError, setAppError] = useState(null)
    const dispatch = useDispatch()
    const jwt = useSelector(state => state.jwt)
    const csrf = useSelector(state => state.csrf) */
    

    /* const fetchAllLists = () => {
        axios.get('/api/list',
            {
            headers: {
                    'X-ACCESS-TOKEN': jwt.token.token,
                    'CSRF-TOKEN': csrf.csrfToken
                } 
          })
          .then(response => {
              if (response.status === 200) {
                  //listsArray = response.data
              }              
          })
            .catch(error => {
            if (error.response.status === 500) {
                  setAppError('Services are temporarily disabled. Please try again later.')
              } else if (error.response.status === 403) {
                setAppError('Please reload your browser or try logging out and back in.')
            }  else {
                setAppError('There\'s been an error. Please contact support.')
            }
          })
    } */
    //fetchAllLists()
    const [id] = useState(nanoid)
    let listsArray = [1, 2, 3]

    return (
        <div className="all-lists col">
            <ul id="allLists">
                {listsArray.map((el, idx) => {
                    let keyId = id + idx
                    return (
                        <li key={keyId}>
                            <div>List Name</div>
                            <div className="all-lists-count"><span>11</span></div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default AllLists