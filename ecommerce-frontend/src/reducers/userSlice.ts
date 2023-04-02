import { createSlice } from "@reduxjs/toolkit"
import Cookie from "js-cookie"
import axios from "axios"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: localStorage.getItem("userEmail"),
  },
  reducers: {
    loginUser: (state, action) => {
      localStorage.setItem("userEmail", action.payload)
      state.value = action.payload
    },
    logoutUser: (state) => {
      // remove token and user cookie
      Cookie.remove("token", { sameSite: "strict", secure: true })
      delete axios.defaults.headers.common["Authorization"];

      localStorage.removeItem("userEmail")
      state.value = ""
    },
  },
})

export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer
