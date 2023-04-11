import { createSlice } from "@reduxjs/toolkit";

const authAdminSlice = createSlice({
    name: "authAdmin",
    initialState: {
        name: "",
        email: "",
        branchId: "",
        roleId: "",
    },
    reducers: {
        loginActionAdmin: (state, action) => {
            state.name= action.payload.name;
            state.email = action.payload.email;
            state.branchId = action.payload.branchId;
            state.roleId = action.payload.roleId;
        },
        logoutActionAdmin: (state) => {
            state.name = "";
            state.email = "";
            state.branchId = "";
            state.roleId = "";
        }
    },
});

export const {loginActionAdmin, logoutActionAdmin} = authAdminSlice.actions;
export default authAdminSlice.reducer;