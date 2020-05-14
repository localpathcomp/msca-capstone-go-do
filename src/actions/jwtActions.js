const setToken = (tokenObj) => {
    return {
        type: "SET_TOKEN",
        payload: tokenObj
    }
}

export default {
    setToken
}