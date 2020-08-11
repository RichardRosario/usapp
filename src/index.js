import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

const Root = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
