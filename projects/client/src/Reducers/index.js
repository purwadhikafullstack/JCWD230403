import { configureStore } from "@reduxjs/toolkit";
import authAdminReducer from "./authAdmin";
import authUserReducer from "./authUser";

export const globalStore = configureStore({
    reducer: {
        authAdminReducer,
        authUserReducer
    }
});

export default globalStore;