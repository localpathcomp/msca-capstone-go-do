import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { nanoid } from 'nanoid'

import AllListsSingle from './AllListsSingle'
import './AllLists.css'
import allActions from '../../../actions/index'


const AllLists = props => {

    const [allListsResponse, setAllListsResponse] = useState(false)
    const [ hideAllListsButton, setHideAllListsButton] = useState(false)
    const [id] = useState(nanoid)
    const dispatch = useDispatch()
    const jwt = useSelector(state => state.jwt)
    const csrf = useSelector(state => state.csrf)
    if (allListsResponse)
        console.log(allListsResponse.data.results[0]);
    
    const fetchAllLists = () => {
            axios.get('/api/list',
                {
                headers: {
                        'X-ACCESS-TOKEN': jwt.token.token,
                        'CSRF-TOKEN': csrf.csrfToken
                    } 
              })
              .then(response => {
                  if (response.status === 200) {
                      setAllListsResponse({ response: true, data: response.data })     
                  }              
              })
                .catch(error => {
                if (error.response.status === 500) {
                    dispatch(allActions.appErrorActions.setAppError('Services are temporarily disabled. Please try again later.'))
                } else if (error.response.status === 403) {
                    dispatch(allActions.appErrorActions.setAppError('Please reload your browser or try logging out and back in.'))
                } else if (error.response.status === 404) {
                    dispatch(allActions.appErrorActions.setAppError('We couldn\'t find any lists for you! Maybe try adding one!'))                    
                } else {
                    dispatch(allActions.appErrorActions.setAppError('There\'s been an error. Please contact support.'))
                }
              })
        }
        
    return (
        <div className="all-lists col">
            {<ul id="allLists">
                {  (allListsResponse.response === true) ?
                    allListsResponse.data.results.map((el, idx) => {
                        let keyId = id + idx
                        return (
                            <AllListsSingle key={keyId.toString()} data={el} jwt={jwt.token.token} csrf={csrf.csrfToken}/>
                        )
                    })
                : null
                }
            </ul>}
            {(hideAllListsButton) ? null :
                <button className="theme-button-alternate theme-font" onClick={() => { fetchAllLists(); setHideAllListsButton(true); }}>Where's my lists?</button>
            }
        </div>
    )
}

export default AllLists