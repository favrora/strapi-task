import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Product from "./pages/Product"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Header /><Home /></Route>
        <Route exact path="/product/:productSlug"><Header /><Product /></Route>
      </Switch>
    </Router>
  )
}

export default App
