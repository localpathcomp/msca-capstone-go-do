const listAdded = (state = false, action) => {
    switch(action.type){
        case "SHOW":
            return state = true
        case "HIDE":
            return state = false
        default: 
            return state
    }
}

export default listAdded