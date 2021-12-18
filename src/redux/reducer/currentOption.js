const currentOption = (state = 1, action) => {
    switch (action.type){
        case "SET_CURRENT_OPTION":
            return {
                ...state,
                currentOption: action.payload
            }
        default:
            return {
                state,
                currentOption: "menuBtn1"
            }
    }
}

export default currentOption;