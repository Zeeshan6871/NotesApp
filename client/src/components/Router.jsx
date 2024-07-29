import React from "react";
import {
  BrowserRouter as Routers,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Register from "./Register";
import App from "./App";
import Login from "./Login";
import Footer from "./Footer";
import axios from "axios";

axios.defaults.baseURL = "https://notesapp-2948.onrender.com";

var Router = () => {
  return (
    <Routers>
      <Switch>
        <Route path="/" exact component={App}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        <Route render={() => <Redirect to="/" />} />
      </Switch>
      <Footer />
    </Routers>
  );
};

export default Router;
