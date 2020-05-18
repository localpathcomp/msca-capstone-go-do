const list = (state = {}, action) => {
    switch(action.type){
        case "SET_LIST_ID":
            return {
                ...state,
                listId: action.payload
            }
        case "SET_LIST":
            return {
                ...state,
                list: action.payload
            }
        case "DESTROY_LIST":
            return {
                state: undefined
            }
        default:
            return state
    }
}

export default list