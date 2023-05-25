import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cart: [],
  totalQuantity: 0,
  subTotal: 0,
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
    resetCart: (state, action) => {
      state.cart = []
    }
  },
})

export const { addProductToCart, itemCart, getSubTotal, getTotalQty, resetCart } =
  cartSlice.actions
export default cartSlice.reducer
