import React, { useState } from "react"
import { registerUser } from "../utils/api"
import { useDispatch } from "react-redux"
import { loginUser } from "../reducers/userSlice"

function Register() {
  const dispatch = useDispatch()
  const [data, updateData] = useState({
    email: "",
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>({})

  function onChange(event: any) {
    event.preventDefault()
    updateData({ ...data, [event.target.name]: event.target.value })
  }

  const submitForm = async (e: any) => {
    e.preventDefault()
    if (loading) return false
    data.email = e.target.email.value
    data.password = e.target.password.value
    setLoading(true)

    registerUser(data.username, data.email, data.password)
      .then((res: any) => {
        setLoading(false)
        dispatch(loginUser(res.data.user))
        window.location.href = "/"
      })
      .catch((error) => {
        if (error.response.data) {
          setError(error.response.data)
        } else {
          setError("login successful")
        }
        setLoading(false)
      })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 auth-box">
          <div className="card">
            <div className="card-header text-larger">Register</div>
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
                    <label htmlFor="email">Email</label>
                    <input
                      className="form-control"
                      name="email"
                      type="email"
                      onChange={(event) => onChange(event)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="username">Username</label>
                    <input
                      className="form-control"
                      name="username"
                      type="text"
                      onChange={(event) => onChange(event)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="password">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      onChange={(event) => onChange(event)}
                    />
                  </div>

                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary submitForm mt-3 mb-3"
                    >
                      {loading ? "Registering... " : "Register"}
                    </button>
                    <a className="btn-link" href="/login">
                      Already have an account? Login
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

export default Register
