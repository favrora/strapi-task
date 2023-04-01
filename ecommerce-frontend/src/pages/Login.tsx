import React, { useState, useContext } from "react"
import { login } from "../utils/api"

function Login() {
  const [data, updateData] = useState({
    identifier: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(false)

  function onChange(event: any) {
    event.preventDefault()
    updateData({ ...data, [event.target.name]: event.target.value })
  }

  const submitForm = async (e: any) => {
    e.preventDefault()
    data.identifier = e.target.identifier.value
    data.password = e.target.password.value
    setLoading(true)
    login(data.identifier, data.password)
      .then((res: any) => {
        setLoading(false)
        // set authed User in global context to update header/app state
        // setUser(res.data.user);
      })
      .catch((error) => {
        console.log(error)
        if (error.response) {
          setError(error.response.data)
        }
        setLoading(false)
      })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 auth-box">
          <div className="card">
            <div className="card-header text-larger">Login</div>
            <div className="card-body">
              {Object.entries(error).length !== 0 &&
                error.constructor === Object &&
                error.message.map((error) => {
                  return (
                    <div
                      key={error.messages[0].id}
                      style={{ marginBottom: 10 }}
                    >
                      <small style={{ color: "red" }}>
                        {error.messages[0].message}
                      </small>
                    </div>
                  )
                })}

              <form onSubmit={submitForm}>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="name">Email</label>
                    <input
                      className="form-control"
                      name="identifier"
                      type="email"
                      onChange={(event) => onChange(event)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="firstName">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      onChange={(event) => onChange(event)}
                      autoComplete="current-password"
                    />
                  </div>

                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary submitForm mt-3 mb-3"
                    >
                      {loading ? "Logging in... " : "Login"}
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
