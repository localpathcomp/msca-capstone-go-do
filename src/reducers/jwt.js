const jwt = (state = {}, action) => {
    switch(action.type){
        case "SET_TOKEN":
            return {
                ...state,
                token: action.payload
            }
        case "DESTROY_TOKEN":
            return {
                state: undefined
            }
        default:
            return state
    }
}

export default jwt;