import { createSlice } from "@reduxjs/toolkit";

const authUserSlice = createSlice({
    name: "authUser",
    initialState: {
        name: "",
        email: "",
        isVerified: "",
        roleId: ""
    },
    reducers: {
        loginActionUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isVerified = action.payload.isVerified;
            state.roleId = action.payload.roleId;
        },
        logoutActionUser: (state) => {
            state.name = "";
            state.email = "";
            state.isVerified = "";
            state.roleId = "";
        }
    }
});

export const {loginActionUser, logoutActionUser} = authUserSlice.actions;
export default authUserSlice.reducer;