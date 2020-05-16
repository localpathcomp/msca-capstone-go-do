import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'

import List from './List'
import './CreateList.css'

const CreateList = () => {
    
    const [id] = useState(nanoid)

    const getItems = [
            {
                id: 1,
                name: 'some name'
            },
            {
                id: 2,
                name: 'some more'
            }
        ]

    return (
        <div className="create-list-wrapper col">
            <List items={getItems} />
        </div>
    )
}

export default CreateList