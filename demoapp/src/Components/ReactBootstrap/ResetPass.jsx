import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useFormik } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as Yup from "yup";

import axios from "axios";

import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";

import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

import FormControl from "@material-ui/core/FormControl";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function ResetPass() {
  const [success, setsuccess] = useState(true);
  const [message, setmessage] = useState();

  const location = useLocation();
  const history = useHistory();
  var id = new URLSearchParams(location.search).get("id");

  async function makepostreq(data) {
    var res = await axios({
      method: "post",
      url: `http://localhost:3002/api/reset/${id}`,
      data: data,
    });

    console.log(res.data);
    if (res.data.success === false) {
      setsuccess(res.data.success);
      setmessage(res.data.message);
    } else {
      setsuccess(true);

      history.push("/login");
    }
  }
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values, e) => {
      console.log(values);
      makepostreq(values);
      localStorage.setItem("resetuser", JSON.stringify(values));
    },
  });

  return (
    <div>
      <div className="main_page">
        <div className="main_page2">
          <div className="login_form">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <h4 className="login_title">Reset Password</h4>
              </div>
              <div className="from_grp">
                <FormControl>
                  <InputLabel>Password</InputLabel>
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
                  {" "}
                  {formik.touched.password && formik.errors.password}{" "}
                  {success === false ? message : null}
                </FormHelperText>
                <br></br>
                <br></br>
                <FormControl>
                  <InputLabel> Confirm Password</InputLabel>
                  <Input
                    name="confirmpassword"
                    className="passfield"
                    value={formik.values.confirmpassword}
                    type={values.showPassword ? "text" : "password"}
                    // value={values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.confirmpassword &&
                      Boolean(formik.errors.confirmpassword)
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
                  {" "}
                  {formik.touched.confirmpassword &&
                    formik.errors.confirmpassword}
                </FormHelperText>
                <br></br>

                <button type="submit" className="loginbtn">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPass;
