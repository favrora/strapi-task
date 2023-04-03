import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../reducers/userSlice"

function Header() {
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.user.userEmail)
  const userCart = useSelector((state: any) => state.user.userCart)

  function logout() {
    dispatch(logoutUser())
    window.location.reload()
  }

  return (
    <div className="header">
      <a href="/" className="header-logo">
        <img src="/strapi.png" alt="Site logo" />
      </a>
      <div className="">{user}</div>
      {user ? (
        <>
          <div>
            <a href="/cart" className="header-menu">
              Cart ({userCart.length})
            </a>
            <span className="btn-link header-menu" onClick={logout}>
              Logout
            </span>
          </div>
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
