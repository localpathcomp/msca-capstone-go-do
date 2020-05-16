import React, { useState, useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'

import Item from './Item'
import AddItem from './AddItem'

import './List.css'

const List = props => {

    const [addItem, setAddItem] = useState(false)
    const [list, setList] = useState({})
    const [id] = useState(nanoid)

    const handleInputChange = (e, stateType) => {
        const { name, value } = e.target
        setList({ ...stateType, [name]: value })
    }
    const toggleAddItem = () => {
        setAddItem(!addItem)
    }

    return (
        <div className="create-list-grid d-flex">
            <form id="createList">
                <div className="form-group">
                    <label>List Name
                    <input
                        onChange={e => handleInputChange(e, list)}
                        className="form-control"
                        type="text"
                        autoComplete="none"
                        name="title" />
                    </label>
                </div>
                <div className="form-group">
                    <label>List Description
                    <input
                        onChange={e => handleInputChange(e, list)}
                        className="form-control"
                        type="text"
                        autoComplete="none"
                        name="description" />
                    </label>
                </div>
            </form>
            <div className="flex-grid">
                <div className="col">
                {
                (addItem) ?
                    <AddItem click={toggleAddItem} listId={id} /> :
                    <button className="theme-button" onClick={toggleAddItem}>New Item</button>
                    }
                    <button className="theme-button">Save List</button>
                </div>
                <div className="items-list col">
                    <ul>
                    {props.items.map((item, index) => (
                        <Item key={index} item={item} />
                    ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default List