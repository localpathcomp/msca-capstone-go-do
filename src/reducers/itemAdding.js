const itemAdding = (state, action) => {
    switch(action.type){
        case "SHOW":
            return state = true
        case "HIDE":
            return state = false
        default: 
            return state = false
    }
}

export default itemAdding