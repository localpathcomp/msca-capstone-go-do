import React, { useState, useEffect, useRef } from 'react'
import {
    withRouter,
    useParams
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const PassTest = props => {

    return (
        <div>
            <p>{props.name}</p>
            Pass test ok
        </div>
    )
}

export default PassTest