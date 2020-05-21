import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    useParams,
    withRouter
} from 'react-router-dom'
import axios from 'axios'
import { nanoid } from 'nanoid'

import './List.css'
import allActions from '../../../actions/index'
import Item from '../../Item/Item'

const List = props => {

    const dispatch = useDispatch()
    const [listResponse, setListResponse] = useState(false)
    const [id] = useState(nanoid)
    const jwt = useSelector(state => state.jwt)
    const csrf = useSelector(state => state.csrf)
    const listData = useParams()

    let listProps = props.history.location.state.listData

    useEffect(() => {
        axios.get(`/api/list/${listData.id}/items`, {
            headers: {
                    'X-ACCESS-TOKEN': jwt.token.token,
                    'CSRF-TOKEN': csrf.csrfToken
                } 
        })
        .then(response => {
            if (response.status === 200) {
                setListResponse({response: true, data: response.data })
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
    }, [listData.id, jwt.token.token, csrf.csrfToken, dispatch, setListResponse])

    return (
        <div className="list-view">
            <div className="list-view-wrapper">
                <h2 className="list-view-title">{listProps.title}</h2>
                <h6 className="list-view-description">{listProps.description}</h6>
                <ul>
                {(listResponse.response === true) ?
                    listResponse.data.results.map((el, idx) => {
                        let keyId = id + idx
                        return (
                            <Item key={keyId.toString()} item={el} jwt={jwt.token.token} csrf={csrf.csrfToken}/>
                        )
                    })
                : null
                }
                </ul>
            </div>
        </div>
    )
}

export default withRouter(List)