import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
// import LoginRedirect from "./pages/LoginRedirect";

const App = () => {
  return (
    <Router>
      <Switch>
        {/* <Route
          exact
          path="/connect/:providerName/redirect"
          component={LoginRedirect}
        /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:productSlug" component={Product} />
      </Switch>
    </Router>
  );
};

export default App;
