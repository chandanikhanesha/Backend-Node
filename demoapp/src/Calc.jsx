import React, { useState } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";

const initialValues = {
  bill: "",
};
const SignInSchema = Yup.object().shape({
  bill: Yup.string().required("field is required"),
  people: Yup.string().required("field is required"),
});

function Calc() {
  const [bill, setbill] = useState();
  const [people, setpeople] = useState();
  const [service, setservice] = useState();
  const [result, setResult] = useState(0.0);

  // const handlebill=(event)=>{

  //     setbill(event.target.value)

  // }
  // const handlepeople=(event)=>{
  //     setpeople(event.target.value)
  // }
  const handleservice = (event) => {
    setservice(event.target.value);
  };

  const billvalue = (event) => {
    console.log(bill);
    console.log(people);
    console.log(service);
    setservice("");
    setpeople("");
    setbill("");
    event.preventDefault();
    let r1 = +bill * (+service / 100);
    console.log(r1);
    let r2 = (+bill + r1) / people;
    console.log(r2);
    setResult(r2);
  };

  // const validate=(value)=>{
  //     let error;
  //     if(!value){
  //         error= 'field required'
  //     }
  //     else if(!value.typeof==Number){
  //         error = ' Must be Number'
  //     }
  //     return error;

  // }
  const onsubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onsubmit={onsubmit}
      >
        {(formik) => {
          return (
            <Form>
              <h2>Tip Calculator</h2>
              <h5>How Much Was Your Bill?</h5>${" "}
              <Field
                type="number"
                value={formik.bill}
                name="bill"
                placeholder="enter a bill amount"
              />
              {formik.errors.bill ? <span>{formik.errors.bill}</span> : null}
              <h5>How Was Your Service?</h5>
              <select value={service} onChange={handleservice}>
                <option>-- choose a option --</option>
                <option value={10}>10% good</option>
                <option value={20}>20% gst </option>
                <option value={30}>30% tax </option>
              </select>
              <h5>How Many people are sharing the bill?</h5>
              <Field
                type="number"
                value={formik.people}
                name="people"
                placeholder="enter a people number"
              ></Field>
              {formik.errors.people ? (
                <span>{formik.errors.people}</span>
              ) : null}
              <br></br>
              <br></br>
              <Button
                variant="contained"
                type="submit"
                onClick={billvalue}
                color="secondary"
              >
                Calculate!
              </Button>
              <br></br>
              <br></br>
              <h2> TIP AMOUNT</h2>${result}
              <br></br>
              for each
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Calc;
