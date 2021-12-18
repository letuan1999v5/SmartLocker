const setLoginStatus = (status) => {
    return {
        type: "SET_LOGIN_STATUS",
        payload: status
    }
}

export default {
    setLoginStatus,
}