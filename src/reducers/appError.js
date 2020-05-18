const appError = (state = {}, action) => {
    switch(action.type){
        case "SET_APP_ERROR":
            return {
                ...state,
                errorMessage: action.payload,
                errorStatus: true
            }
        case "CLEAR_APP_ERROR":
            return {
                ...state,
                errorMessage: null,
                errorStatus: false
            }
        default:
            return state
    }
}

export default appError