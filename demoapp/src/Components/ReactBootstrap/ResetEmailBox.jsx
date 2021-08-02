import React, { useState } from "react";
import * as Yup from "yup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import { useFormik } from "formik";
import FormControl from "@material-ui/core/FormControl";

import axios from "axios";

export default function ResetEmailBox() {
  const [open, setOpen] = useState(false);

  const [success, setsuccess] = useState(true);
  const [message, setmessage] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getdata = () => {
    handleClickOpen();
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("email is requied"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values, e) => {
      console.log(values);
      forgot(values);

      localStorage.setItem("resetemail", JSON.stringify(values));
    },
  });

  async function forgot(data) {
    let res = await axios.post("http://localhost:3002/api/forgot", data);
    console.log(res.data);
    if (res.data.success === false) {
      setsuccess(res.data.success);
      setmessage(res.data.message);
    } else {
      setsuccess(true);
    }
  }

  return (
    <div>
      <div className="mt-2 position-relative">
        <span className="fpass" onClick={getdata}>
          forgot password?
        </span>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <span className="forgottext">Reset your password</span>

        <DialogActions>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <InputLabel> Email</InputLabel>
              <Input
                name="email"
                id="emailfield"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
            </FormControl>
            <FormHelperText style={{ color: "red" }}>
              {" "}
              {formik.touched.email && formik.errors.email}
            </FormHelperText>
            <br></br>

            <br></br>
            <button type="submit" className="forgotsubmit">
              Submit
            </button>
            <br></br>
            <div className="errormess">
              {success === false ? message : null}
            </div>
            <br></br>
            <button type="submit" onClick={handleClose} className="agreelogin">
              cancel
            </button>
          </form>
        </DialogActions>
      </Dialog>
    </div>
  );
}
