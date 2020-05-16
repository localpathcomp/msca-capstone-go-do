const setCSRFToken = (tokenObj) => {
    return {
        type: "SET_CSRF_TOKEN",
        payload: tokenObj
    }
}

export default { setCSRFToken }