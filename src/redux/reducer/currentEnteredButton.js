const currentEnteredButton = (state = 1, action) => {
    switch (action.type){
        case "SET_MOUSE_ENTERED_BUTTON":
            return {
                ...state,
                currentOption: action.payload
            }
        default:
            return {
                state,
                currentOption: ""
            }
    }
}

export default currentEnteredButton;