import React, { useState, useEffect } from "react"

function Login() {
  const [products, setProducts] = useState([])

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 auth-box">
          <div className="card">
            <div className="card-header text-larger">Login</div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      className="form-control"
                      type="text"
                      name="first_name"
                      value=""
                    ></input>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      className="form-control"
                      type="text"
                      name="first_name"
                      value=""
                    ></input>
                  </div>

                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary submitForm mt-3 mb-3"
                    >
                      Login
                    </button>
                    <a className="btn-link" href="/register">
                      Don't have an account? Register
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
