import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../reducers/userSlice"
import { useHistory } from "react-router-dom";

function Header() {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state: any) => state.user.value)

  function logout() {
    dispatch(logoutUser())
    history.push('/')
  }

  return (
    <div className="header">
      <a href="/" className="header-logo">
        <img src="/strapi.png" alt="Site logo" />
      </a>
      <div className="">{user}</div>
      {user ? (
        <>
          <span className="btn-link header-menu" onClick={logout}>
            Logout
          </span>
        </>
      ) : (
        <>
          <a href="/register" className="header-menu">
            Register
          </a>
        </>
      )}
    </div>
  )
}

export default Header
