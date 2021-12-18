const loginStatus = (state = 1, action) => {
    switch (action.type){
        case "SET_LOGIN_STATUS":
            return {
                ...state,
                loginStatus: action.payload
            }
        default:
            return {
                state,
                loginStatus: ""
            }
    }
}

export default loginStatus;