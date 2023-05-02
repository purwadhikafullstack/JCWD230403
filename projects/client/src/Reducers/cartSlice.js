import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cart: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      let newProductItem = action.payload
      state.cart.push(newProductItem)
    },
    itemCart: (state, action) => {
      state.cart = action.payload
    },
    getSubTotal: (state, action) => {
      state.subTotal = action.payload
    },
    getTotalQty: (state, action) => {
      state.totalQty = action.payload
    },
  },
})

export const { addProductToCart, itemCart, getSubTotal, getTotalQty } =
  cartSlice.actions
export default cartSlice.reducer
