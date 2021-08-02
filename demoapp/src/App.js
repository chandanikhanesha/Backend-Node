import "./App.css";
// import ReactDOM from "react-dom";
// import { DemoFormik } from "./DemoFormik";
// import Calc from "./Calc";
// import ReactBootstrap from "./Components/ReactBootstrap/ReactBootstrap";
// import GitTest from "./GitTest";
//import Navbar from "./Components/ReactBootstrap/Navbar";
//  import Login from "./Components/ReactBootstrap/Login";
import NavbarRouter from "./Components/ReactBootstrap/NavbarRouter";
import { BrowserRouter } from "react-router-dom";

// import SignUp from "./Components/ReactBootstrap/SignUp";

function App() {
  return (
    <BrowserRouter>
      <NavbarRouter />
    </BrowserRouter>
  );
}

export default App;
// <BrowserRouter>
// <NavbarRouter />
// </BrowserRouter>
