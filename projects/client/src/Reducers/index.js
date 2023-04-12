import { configureStore } from "@reduxjs/toolkit";
import authAdminReducer from "./authAdmin";
import authUserReducer from "./authUser";
import cartSlice from "./cartSlice";

export const globalStore = configureStore({
    reducer: {
        authAdminReducer,
        authUserReducer,
        cartSlice
    }
});

export default globalStore;