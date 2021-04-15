import React from "react";
import "./App.css";
import "./tailwind.output.css";
import { Registration } from "./modules/authentification/pages/Registration";
import { Login } from "./modules/authentification/pages/Login";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { HomePage } from "./modules/home/pages/HomePage";
import { Nav } from "./components/Nav";
import { Authorization } from "./modules/authentification/components/Authorization";

function App() {
  return (
    <Authorization>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Registration />
          </Route>
          <Route exact path="/">
            <>
              <Nav></Nav>
              <HomePage />
            </>
          </Route>
        </Switch>
      </Router>
    </Authorization>
  );
}

export default App;
