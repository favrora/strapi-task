import { createSlice } from "@reduxjs/toolkit"
import Cookie from "js-cookie"
import axios from "axios"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: localStorage.getItem("userId"),
    userEmail: localStorage.getItem("userEmail"),
    userCart: []
  },
  reducers: {
    loginUser: (state, action) => {
      localStorage.setItem("userId", action.payload.id)
      localStorage.setItem("userEmail", action.payload.email)

      console.log(action.payload);
      console.log(action.payload.email);

      // Save cart array
      // action.payload.cart.products

      // state.userCart = []
    },
    logoutUser: (state) => {
      // remove token and user cookie
      Cookie.remove("token", { sameSite: "strict", secure: true })
      delete axios.defaults.headers.common["Authorization"];

      localStorage.removeItem("userId")
      localStorage.removeItem("userEmail")
      // state.userCart = []
    },
  },
})

export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer
