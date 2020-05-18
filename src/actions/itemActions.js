const setItem = (item) => {
    return {
        type: "SET_ITEM",
        payload: item
    }
}

const updateItem = (item) => {
    return {
        type: "UPDATE_ITEM",
        payload: item
    }
}

const destroyAllItems = () => {
    return {
        type: "DESTROY_ALL_ITEMS"
    }
}

export default {
    setItem,
    updateItem,
    destroyAllItems
}