import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Product from "./pages/Product"
import Register from "./pages/Register"
import Login from "./pages/Login"

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/product/:productSlug" component={Product} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  )
}

export default App
