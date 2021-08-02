import React, { useState } from "react";

import axios from "axios";
import FormHelperText from "@material-ui/core/FormHelperText";

import { useFormik } from "formik";

import * as Yup from "yup";

import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";

import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

import FormControl from "@material-ui/core/FormControl";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const validationSchema = Yup.object({
  email: Yup.string().email().required("email is requied"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("oldPassword is required"),
  newpassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
function ChangePass() {
  const [success, setsuccess] = useState(true);
  const [message, setmessage] = useState();
  const [message2, setmessage2] = useState();

  const [values, setValues] = React.useState({
    showPassword: false,
    showconfirmpassword: false,
    shownewpassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showconfirmPassword: !values.showconfirmPassword });
  };
  const handleClickShownewPassword = () => {
    setValues({ ...values, shownewPassword: !values.shownewPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  async function makepostreq(data) {
    var res = await axios({
      method: "post",
      url: `http://localhost:3002/api/change`,
      data: data,
    });
    console.log(res.data);
    if (res.data.success === false) {
      setsuccess(res.data.success);
      setmessage(res.data.message);
    } else {
      setsuccess(true);
      setmessage2(res.data.message);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      newpassword: "",
      confirmpassword: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("alldata----", values);
      makepostreq(values);
      localStorage.setItem("changeuser", JSON.stringify(values));
    },
  });

  return (
    <div>
      <div className="main_page">
        <div className="main_page2">
          <div className="login_form">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <h4 className="login_title">Change Password</h4>
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
                </FormHelperText>
                <br></br>

                <FormControl>
                  <InputLabel> Old Password</InputLabel>
                  <Input
                    name="password"
                    className="passfield"
                    value={formik.password}
                    type={values.showPassword ? "text" : "password"}
                    onChange={formik.handleChange}
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
                  <InputLabel>New Password</InputLabel>
                  <Input
                    name="newpassword"
                    className="passfield"
                    value={formik.newpassword}
                    type={values.shownewPassword ? "text" : "password"}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.newpassword &&
                      Boolean(formik.errors.newpassword)
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShownewPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.shownewPassword ? (
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
                  {formik.touched.newpassword && formik.errors.newpassword}
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
                <div className="errormess">
                  {success === false ? message : null}
                  {success === true ? message2 : null}
                </div>
                <br></br>

                <button type="submit" className="loginbtn">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePass;
