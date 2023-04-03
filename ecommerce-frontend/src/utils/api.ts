import Cookie from "js-cookie"
import axios from "axios"

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"

// Register a new user
export const registerUser = (username, email, password) => {
  // prevent function from being ran on the server
  if (typeof window === "undefined") {
    return Promise.resolve(false)
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, { username, email, password })
      .then((res) => {
        //set token response from Strapi for server validation
        Cookie.set("token", res.data.jwt, { sameSite: "strict", secure: true })
        //resolve the promise to set loading to false
        resolve(res)
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error)
      })
  })
}

// Login
export const login = (identifier, password) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return Promise.resolve(false)
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/`, { identifier, password })
      .then((res) => {
        //set token response from Strapi for server validation
        Cookie.set("token", res.data.jwt, { sameSite: "strict", secure: true })
        //resolve the promise to set loading to false
        resolve(res)
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error)
      })
  })
}
