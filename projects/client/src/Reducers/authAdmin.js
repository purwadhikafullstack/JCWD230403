import { createSlice } from "@reduxjs/toolkit";

const authAdminSlice = createSlice({
    name: "authAdmin",
    initialState: {
        name: "",
        email: "",
        isSuper: "",
        roleId: "",
    },
    reducers: {
        loginActionAdmin: (state, action) => {
            state.name= action.payload.name;
            state.email = action.payload.email;
            state.isSuper = action.payload.isSuper;
            state.roleId = action.payload.roleId;
        },
        logoutActionAdmin: (state) => {
            state.name = "";
            state.email = "";
            state.isSuper = "";
            state.roleId = "";
        }
    },
});

export const {loginActionAdmin, logoutActionAdmin} = authAdminSlice.actions;
export default authAdminSlice.reducer;