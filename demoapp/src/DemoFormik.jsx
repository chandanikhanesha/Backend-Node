import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(4, "Password is too short - should be 4 chars minimum"),
});

function DemoFormik() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="container">
            <h1>Sign in to continue</h1>
            <Form>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                <ErrorMessage name="email" component="span" className="error" />
              </div>

              <div className="form-row">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
                <ErrorMessage name="password" component="span" />
              </div>

              <button type="submit">Sign In</button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default DemoFormik;
