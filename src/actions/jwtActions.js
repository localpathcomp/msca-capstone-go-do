const setToken = (tokenObj) => {
    return {
        type: "SET_TOKEN",
        payload: tokenObj
    }
}

const destroyToken = (tokenObj) => {
    return {
        type: "DESTROY_TOKEN"
    }
}

export default {
    setToken,
    destroyToken
}