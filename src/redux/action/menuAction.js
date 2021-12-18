const setCurrentOption = (currentOption) => {
    return {
        type: "SET_CURRENT_OPTION",
        payload: currentOption
    }
}

const setMouseEnteredButton = (currentOption) => {
    return {
        type: "SET_MOUSE_ENTERED_BUTTON",
        payload: currentOption
    }
}

export default {
    setCurrentOption,
    setMouseEnteredButton
}