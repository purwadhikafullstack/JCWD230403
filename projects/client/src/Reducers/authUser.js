import { createSlice } from "@reduxjs/toolkit";

const authUserSlice = createSlice({
    name: "authUser",
    initialState: {
        name: "",
        email: "",
        isVerified: "",
        roleId: "",
        branchId: "",
    },
    reducers: {
        loginActionUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isVerified = action.payload.isVerified;
            state.roleId = action.payload.roleId;
            state.branchId = action.payload.branchId;
        },
        logoutActionUser: (state) => {
            state.name = "";
            state.email = "";
            state.isVerified = "";
            state.roleId = "";
            state.branchId = "";
        }
    }
});

export const {loginActionUser, logoutActionUser} = authUserSlice.actions;
export default authUserSlice.reducer;