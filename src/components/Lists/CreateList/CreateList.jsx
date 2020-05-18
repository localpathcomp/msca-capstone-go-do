import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import axios from 'axios'

import AddItem from './AddItem'

import './CreateList.css'
import allActions from '../../../actions'

const CreateList = () => {

    const [addNewList, setAddNewList] = useState(false)//add new list, toggles
    const [addItemsToList, setAddItemsToList] = useState(false)//add items to list, toggles
    const [listDBId, setListDBId] = useState(null)//list database id, FK items.list_id
    const dispatch = useDispatch()
    
    const [list, setList] = useState(null)//local list container, clear on callback, save items to list via db
    const [id] = useState(nanoid)//generate list guid
    //jwt, csrf
    const jwt = useSelector(state => state.jwt)
    const csrf = useSelector(state => state.csrf)
    
    useEffect(() => {
        setList({listId: id})
    }, [id])
    
    const handleInputChange = (e, stateType) => {
        const { name, value } = e.target
        setList({ ...stateType, [name]: value })
    }    

    /* post new list */
    const createNewList = (e) => {
        e.preventDefault()
        axios.post('/api/list', {
            listId: list.listId,
            listTitle: list.listTitle,
            listDescription: list.listDescription
            },
            {
            headers: {
                    'X-ACCESS-TOKEN': jwt.token.token,
                    'CSRF-TOKEN': csrf.csrfToken
                } 
          })
          .then(response => {
              if (response.status === 201) {           
                  setListDBId(response.data.insertId)
                setAddItemsToList(true)
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
    }
    /* post new item */
    const createNewItem = (e, item) => {
        e.preventDefault()
        axios.post('/api/item', {
            listId: item.listId,
            itemId: item.itemId,
            itemTitle: item.itemTitle,
            itemDescription: item.itemDescription
            },
            {
            headers: {
                    'X-ACCESS-TOKEN': jwt.token.token,
                    'CSRF-TOKEN': csrf.csrfToken
                } 
          })
          .then(response => {
              if (response.status === 201) {                 
                setAddItemsToList(true)
              }              
          })
            .catch(error => {
            if (error.response.status === 500) {
                  dispatch(allActions.appErrorActions.setAppError('Services are temporarily disabled. Please try again later.'))
              } else if (error.response.status === 403) {
                dispatch(allActions.appErrorActions.setAppError('Please reload your browser or try logging out and back in.'))
            }  else {
                dispatch(allActions.appErrorActions.setAppError('There\'s been an error. Please contact support.'))
            }
          })
    }

    
    return (

        <div className="create-list-wrapper col">
            <div className="create-list-grid d-flex">
                {(addItemsToList) ?
                    <AddItem listId={listDBId} createItem={createNewItem} /> :
                    <form id="createList">
                        {(addNewList) ?
                            <div>
                                <div className="form-group">
                                    <label>List Name
                                        <input
                                            onChange={e => handleInputChange(e, list)}
                                            className="form-control"
                                            type="text"
                                            autoComplete="none"
                                            name="listTitle" />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>List Description
                                        <input
                                            onChange={e => handleInputChange(e, list)}
                                            className="form-control"
                                            type="text"
                                            autoComplete="none"
                                            name="listDescription" />
                                    </label>
                                </div></div> : <div className="create-list-intro"><p>Add A New List</p></div>}
                        {(addNewList) ?
                            <div>
                                <button className="theme-button-alternate" onClick={(e) => createNewList(e)}>Create List</button>
                            </div>
                            :
                            <div className="theme-button-widget">
                                <div onClick={() => setAddNewList(true)}><span>+</span></div>
                            </div>
                        }
                    </form>
                }
            </div>
        </div>
    )
}

export default CreateList