import { createSlice } from "@reduxjs/toolkit";

export const userManagementSlice = createSlice({
    name: "userManagement",
    initialState: {
        type: "getAll",
        searchValue: {
            uName: "",
            eName: "",
            eCode: "",
            dId: 0,
            email: "",
            eTag: "", 
            isTag: 0,
            isPin: 0,
            isGroup: 0,
            isVip: 0,
        }
    },
    reducers: {
        getAll: (state) => {
            state.type = "getAll";
        },
        search: (state, data) => {
            state.type = "search";
            state.searchValue = data.payload;
            
            // state.searchValue = {
            //     uName: data.uName,
            //     eName: data.eName,
            //     eCode: data.eCode,
            //     dId: data.dId,
            //     email: data.email,
            //     eTag: data.eTag,
            //     isTag: data.isTag,
            //     isPin: data.isPin,
            //     isGroup: data.isGroup,
            //     isVip: data.isVip,
            // }
            return state;
        }
    }
});



export const { getAll, search } = userManagementSlice.actions;

export default userManagementSlice.reducer;