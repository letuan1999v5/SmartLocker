import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name: "menu",
    initialState: {
        value: 1,
    },
    reducers: {
        selectBtn1: (state) => {
            state.value = 1;
        },
        selectBtn2: (state) => {
            state.value = 2;
        },
        selectBtn3: (state) => {
            state.value = 3;
        },
        selectBtn4: (state) => {
            state.value = 4;
        },
        selectBtn5: (state) => {
            state.value = 5;
        },
        selectBtn6: (state) => {
            state.value = 6;
        },
        selectBtn7: (state) => {
            state.value = 7;
        },
        selectBtn8: (state) => {
            state.value = 8;
        },
        selectBtn9: (state) => {
            state.value = 9;
        },
        selectBtn10: (state) => {
            state.value = 10;
        },
        selectBtn11: (state) => {
            state.value = 11;
        },
        selectBtn12: (state) => {
            state.value = 12;
        },
        selectBtn13: (state) => {
            state.value = 13;
        },
        selectBtn14: (state) => {
            state.value = 14;
        },
        selectBtn15: (state) => {
            state.value = 15;
        },
        selectBtn16: (state) => {
            state.value = 16;
        }
    }
});

export const {
    selectBtn1,
    selectBtn2,
    selectBtn3,
    selectBtn4,
    selectBtn5,
    selectBtn6,
    selectBtn7,
    selectBtn8,
    selectBtn9,
    selectBtn10,
    selectBtn11,
    selectBtn12,
    selectBtn13,
    selectBtn14,
    selectBtn15,
    selectBtn16,
} = menuSlice.actions;

export default menuSlice.reducer;