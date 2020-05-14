const jwt = (state = {}, action) => {
    switch(action.type){
        case "SET_TOKEN":
            return {
                ...state,
                token: action.payload
            }
        default:
            return state
    }
}

export default jwt;