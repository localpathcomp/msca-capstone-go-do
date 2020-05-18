const setList = (listObj) => {
    return {
        type: "SET_LIST",
        payload: listObj
    }
}

const setListId = (listId) => {
    return {
        type: "SET_LIST_ID",
        payload: listId
    }
}

const destroyList = () => {
    return {
        type: "DESTROY_LIST"
    }
}

export default {
    setList,
    setListId,
    destroyList
}