import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

import './AddItem.css'

const AddItem = props => {

    const [item, setItem] = useState({})//item state
    const [regenId, setRegenId] = useState(false)//regen guid without component render
    
    const handleInputChange = (e, stateType) => {
        const { name, value } = e.target
        setItem({ ...stateType, [name]: value })
    }
    const saveItemToList = (e) => {
        e.preventDefault()
        document.querySelector('form#addItemForm').reset()
        props.createItem(e, { listId: props.listId, itemId: item.itemId, itemTitle: item.itemTitle, itemDescription: item.itemDescription })
        setItem({ itemId: null })
        setRegenId(!regenId)
    }
    
    useEffect(() => {
        let itemId = nanoid()
        setItem({itemId: itemId})
    }, [regenId])

    return (
        <div className="add-item col">
            <form id="addItemForm">
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
                <button className="theme-button-alternate" onClick={ e => saveItemToList(e) }>Save Item</button>
            </form>
        </div>
    )

}

export default AddItem