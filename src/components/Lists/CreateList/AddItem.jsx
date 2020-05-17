import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../../actions/index'
import { nanoid } from 'nanoid'
import axios from 'axios'

const AddItem = props => {

    const [inputError, setInputError] = useState(null)
    const [item, setItem] = useState({})
    const [id] = useState(nanoid)
    const jwt = useSelector(state => state.jwt)
    const csrf = useSelector(state => state.csrf)
       
    const handleInputChange = (e, stateType) => {
        const { name, value } = e.target
        setItem({ ...stateType, [name]: value })
    }
    const saveItemToList = () => {
        console.log(jwt.token);
        
        const jwtJSON = JSON.stringify(jwt.token.token)
        //const jwtHeader = Buffer.from(jwtJSON, 'utf8').toString('base64')
        itemSave(jwtJSON)
    }

    const itemSave = (jwtHeader) => {
        console.log(item);
        axios.post('/api/list', {
            listId: props.listId,
            itemId: id,
            itemTitle: item.itemTitle,
            itemDescription: item.itemDescription
            },
            {
            headers: {
                    'X-ACCESS-TOKEN': jwtHeader,
                    'CSRF-TOKEN': JSON.stringify(csrf.csrfToken)
                } 
          })
          .then(response => {
              if (response.status === 201) {
                console.log(response);
              }
              console.log(response.status);
              
          })
            .catch(error => {
            if (error.response.status === 500) {
                  setInputError('Services are temporarily disabled. Please try again later.')
              } else if (error.response.status) {
                setInputError(error.response.data)
            }
          })
    }

    return (
        <div className="add-item col">
            <form>
                <div className="form-group">
                    <label>Item Name
                    <input
                        onChange={e => handleInputChange(e, item)}
                        className="form-control"
                        type="text"
                        autoComplete="none"
                        name="itemTitle" />
                    </label>
                </div>
                <div className="form-group">
                    <label>Item Description
                    <input
                        onChange={e => handleInputChange(e, item)}
                        className="form-control"
                        type="text"
                        autoComplete="none"
                        name="itemDescription" />
                    </label>
                </div>
                { inputError && <p className="login-error">{inputError}</p> }
                <button className="theme-button" onClick={() => { saveItemToList(); props.click(); }}>Save Item</button>
            </form>
        </div>
    )

}

export default AddItem