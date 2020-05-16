const csrf = (state = {}, action) => {
    switch(action.type){
        case "SET_CSRF_TOKEN":
            return {
                ...state,
                csrfToken: action.payload
            }
        default:
            return state
    }
}

export default csrf