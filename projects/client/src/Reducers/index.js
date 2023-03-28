import { configureStore } from "@reduxjs/toolkit";
import authAdminReducer from "./authAdmin";

export const globalStore = configureStore({
    reducer: {
        authAdminReducer
    }
});

export default globalStore;