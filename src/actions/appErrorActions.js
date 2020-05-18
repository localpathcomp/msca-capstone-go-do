const setAppError = (errorMessage) => {
    return {
        type: "SET_APP_ERROR",
        payload: errorMessage
    }
}

const clearAppError = (errorMessage) => {
    return {
        type: "CLEAR_APP_ERROR",
        payload: errorMessage
    }
}

export default {
    setAppError,
    clearAppError
}