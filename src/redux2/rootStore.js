import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./reducer/LoginReducer";
import MenuReducer from "./reducer/MenuReducer";
import UserManagementReducer from "./reducer/UserManagementReducer";

export default configureStore({
    reducer: {
        login: LoginReducer,
        menu: MenuReducer,
        userManagement: UserManagementReducer,
    }
});