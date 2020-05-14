import currentUser from './currentUser'
import counter from './counter'
import jwt from './jwt'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    currentUser,
    counter,
    jwt
})

export default rootReducer