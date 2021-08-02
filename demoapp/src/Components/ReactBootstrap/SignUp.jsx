import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import FormHelperText from "@material-ui/core/FormHelperText";
import Container from "react-bootstrap/Container";
import { useFormik } from "formik";
import Checkbox from "@material-ui/core/Checkbox";
import * as Yup from "yup";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import GoogleButton from "react-google-button";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router";

const responsefailureGoogle = (response) => {
  console.log("google", response.tokenId);
};

const validationSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("email is requied"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
const SignUp = () => {
  const history = useHistory();
  const [success, setsuccess] = useState(true);
  const [message, setmessage] = useState();
  const [values, setValues] = React.useState({
    showPassword: false,
    showconfirmpassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showconfirmPassword: !values.showconfirmPassword });
  };

  const handleMouseDownPassword = (event) => {};

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("alldata----", values);
      signup(values);

      localStorage.setItem("signupuser", JSON.stringify(values));
    },
  });

  async function signup(data) {
    let res = await axios.post("http://localhost:3002/api/signup", data);
    console.log(res.data);
    if (res.data.success === false) {
      setsuccess(res.data.success);
      setmessage(res.data.message);
    } else {
      setsuccess(true);
      history.push("/login");
    }
  }

  const responsesuccessGoogle = (response) => {
    console.log(response);
    axios
      .post("http://localhost:3002/api/google", {
        tokenId: response.tokenId,
        accessToken: response.accessToken,
      })
      .then((response) => {
        console.log("login sucessful with google", response);
        localStorage.setItem("token", JSON.stringify(response));

        history.push("/");
      });
  };

  const responseFacebook = (response) => {
    console.log("facebook", response);
    axios
      .post("http://localhost:3002/api/facebook", {
        accessToken: response.accessToken,
        userID: response.userID,
      })
      .then((response) => {
        console.log("login successful with facebook", response);
        localStorage.setItem("token", JSON.stringify(response));
      });
  };

  return (
    <div>
      <div className="main_page">
        <Container>
          <Navbar />
        </Container>
        <div className="main_page2">
          <div className="login_form">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <h4 className="login_title">register now!</h4>
              </div>
              <div className="from_grp">
                <FormControl>
                  <InputLabel> Email</InputLabel>
                  <Input
                    name="email"
                    id="emailfield"
                    value={formik.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                  />
                </FormControl>
                <FormHelperText style={{ color: "red" }}>
                  {" "}
                  {formik.touched.email && formik.errors.email}
                  {success === false ? message : null}
                </FormHelperText>
                <br></br>

                <FormControl>
                  <InputLabel> Password</InputLabel>
                  <Input
                    name="password"
                    className="passfield"
                    value={formik.values.password}
                    type={values.showPassword ? "text" : "password"}
                    onChange={formik.handleChange("password")}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormHelperText style={{ color: "red" }}>
                  {formik.touched.password && formik.errors.password}
                </FormHelperText>
                <br></br>

                <FormControl>
                  <InputLabel> Confirm Password</InputLabel>
                  <Input
                    className="passfield"
                    value={formik.confirmpassword}
                    type={values.showconfirmPassword ? "text" : "password"}
                    name="confirmpassword"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.confirmpassword &&
                      Boolean(formik.errors.confirmpassword)
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showconfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormHelperText style={{ color: "red" }}>
                  {" "}
                  {formik.touched.confirmpassword &&
                    formik.errors.confirmpassword}
                </FormHelperText>

                <br></br>
                <br></br>
                <div>
                  <Checkbox color="primary" defaultChecked />
                  <label className="form_label" htmlFor="checktext">
                    <b>Remember Me</b>
                  </label>

                  <span className="fpass">forgot password?</span>
                </div>

                <button type="submit" className="loginbtn">
                  create your account
                </button>
                <div className="out_text">OR</div>

                <GoogleLogin
                  clientId="883695351233-39aqie9akcd41052asuavr68uskfobfa.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <GoogleButton
                      onClick={renderProps.onClick}
                      className="googlebtn"
                      type="light"
                    ></GoogleButton>
                  )}
                  onSuccess={responsesuccessGoogle}
                  onFailure={responsefailureGoogle}
                  cookiePolicy={"single_host_origin"}
                />

                <FacebookLogin
                  className="kep-login-facebook"
                  appId="4513438582008463"
                  autoLoad={false}
                  callback={responseFacebook}
                  fields="id,name,email"
                  scope="public_profile,email"
                />
                <span className="note">
                  You'll Recieve A Confirmation Email With A Link To Activate
                  Your Account!
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
