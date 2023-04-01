import React from "react"

function Header() {
  return (
    <div className="header">
      <a href="/" className="header-logo">
        <img src="/strapi.png" alt="Site logo" />
      </a>
      <a href="/register" className="header-menu">
        Register
      </a>
    </div>
  )
}

export default Header
