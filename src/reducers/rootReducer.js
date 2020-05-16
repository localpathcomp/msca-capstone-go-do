import currentUser from './currentUser'
import counter from './counter'
import jwt from './jwt'
import csrf from './csrf'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    currentUser,
    counter,
    jwt,
    csrf
})

export default rootReducer