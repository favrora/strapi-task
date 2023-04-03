import { createSlice } from "@reduxjs/toolkit"
import Cookie from "js-cookie"
import axios from "axios"

interface userState {
  userId: string
  userEmail: string
  userCart: Array<number>
}

const initialState: userState = {
  userId: sessionStorage.getItem("userId") ?? "",
  userEmail: sessionStorage.getItem("userEmail") ?? "",
  userCart: JSON.parse(sessionStorage.getItem("userCart") ?? "[]"),
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      let cart: any[] = []
      sessionStorage.setItem("userId", action.payload.id)
      sessionStorage.setItem("userEmail", action.payload.email)

      for (let i = 0; i < action.payload.cart.products.length; i++) {
        cart.push(action.payload.cart.products[i].id)
      }

      sessionStorage.setItem("userCart", JSON.stringify(cart))
    },
    logoutUser: (state) => {
      // remove token, cookie and user data
      Cookie.remove("token", { sameSite: "strict", secure: true })
      sessionStorage.removeItem("userId")
      sessionStorage.removeItem("userEmail")
      sessionStorage.removeItem("userCart")
    },
    changeCart: (state, action) => {
      sessionStorage.setItem("userCart", JSON.stringify(action.payload))
      state.userCart = action.payload
    },
  },
})

export const { loginUser, logoutUser, changeCart } = userSlice.actions
export default userSlice.reducer
