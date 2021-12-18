import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice(
    {
        name: "login",
        initialState: {
            value: false,
        },
        reducers: {
            isLogin: (state) => {
                state.value = "login";
            },
            isLogout: (state) => {
                state.value = "";
            },
            emptyInput: (state) => {
                state.err = "empty";
            },
            isIncorrect: (state) => {
                state.err = "incorrect";
            },
            isDisconnected: (state) => {
                state.err = "disconnected";
            }
        }
    },
);


export const { isLogin, isLogout, emptyInput, isIncorrect, isDisconnected } = loginSlice.actions;

export default loginSlice.reducer;