import currentUser from './currentUser'
import itemAdded from './itemAdded'
import itemAdding from './itemAdding'
import listAdded from './listAdded'
import jwt from './jwt'
import csrf from './csrf'
import list from './list'
import item from './item'
import appError from './appError'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    currentUser,
    itemAdded,
    itemAdding,
    listAdded,
    jwt,
    csrf,
    list,
    item,
    appError
})

export default rootReducer