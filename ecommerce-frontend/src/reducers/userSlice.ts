import { createSlice } from "@reduxjs/toolkit"
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
      localStorage.removeItem("userEmail")
      state.value = ""
    },
  },
})

export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer
