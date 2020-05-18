const item = (state, action) => {
    switch (action.type) {
        case "SET_ITEM":
            return [...state,
                action.payload
            ]
        case "UPDATE_ITEM":
            return state.map((item, index) => {
                if(item.itemId === action.payload.itemId) {
                  return {...item,
                        itemTitle: action.payload.itemTitle,
                        itemDescription: action.payload.itemDescription
                    }
                }
                return item
              })
        case "DESTROY_ALL_ITEMS":
            return []
        default:
            return []
    }
}

export default item