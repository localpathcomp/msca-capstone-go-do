import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import allActions from '../../../actions/index'

const AllListsSingle = props => {
    const [count, setCount] = useState('')
    const dispatch = useDispatch()
    let date = new Date(props.data.created_at).toLocaleDateString()
    
    axios.get(`/api/item/count/${props.data.id}`, {
        headers: {
            'X-ACCESS-TOKEN': props.jwt,
            'CSRF-TOKEN': props.csrf
        }
        
    })
    .then(response => {
        if (response.status === 200) {
            setCount(response.data.results[0].itemCount)
        }              
    })
      .catch(error => {
      if (error.response.status === 500) {
          dispatch(allActions.appErrorActions.setAppError('Services are temporarily disabled. Please try again later.'))
      } else if (error.response.status === 403) {
          dispatch(allActions.appErrorActions.setAppError('Please reload your browser or try logging out and back in.'))
      } else {
         dispatch(allActions.appErrorActions.setAppError('There\'s been an error. Please contact support.'))
      }
    })

    return (
        <li id={props.data.guid}>
            <div>
                <h6>{props.data.title}</h6>
                <p>{date}</p>
            </div>
            <div className="all-lists-interact">
                <div className="all-lists-count"><span>{count}</span></div>
            </div>
        </li>
    )
}

export default AllListsSingle