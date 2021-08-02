import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import ReactBootstrap from "./ReactBootstrap";
import SignUp from "./SignUp";
import ResetPass from "./ResetPass";
import ChangePass from "./ChangePass";
import MapGoogle from "./MapGoogle";
import { Provider } from "react-redux";
import DemoPost from "./DemoPost";
import Payment from "./Payment";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function NavbarRouter() {
  return (
    <div>
      <Switch>
        <Route exact path="/signup" component={SignUp}></Route>
        <Route exact path="/login" component={Login}></Route>
        <PrivateRoute
          authed={localStorage.getItem("token") ? true : false}
          exact
          path="/change"
          component={Payment}
        />{" "}
        <Route exact path="/map" component={MapGoogle}></Route>
        <Route exact path="/" component={ReactBootstrap}></Route>
        <Route exact path="/ResetPass" component={ResetPass}></Route>
      </Switch>
    </div>
  );
}

export default NavbarRouter;

// <PrivateRoute
//   authed={localStorage.getItem("token") ? true : false}
//   path="/"
//   component={ReactBootstrap}
// />
