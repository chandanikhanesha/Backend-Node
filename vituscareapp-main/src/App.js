import logo from "./logo.svg";
import "./App.css";
import Main from "./componet/Main";
import Login from "./componet/Login";
import Register from "./componet/Register";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Main} />
      </Switch>
    </>
  );
}

export default App;
