import React from "react";
import { Formik, Form, Field } from "formik";
import Footer from "../../../Components/Dashboard/Footer/Footer";

const MyForm = () => {
  return (
    <div>
      <h1>Formik Form with Default Prefix</h1>
      <Formik
        initialValues={{ inputField: "" }}
        onSubmit={(values, { resetForm }) => {

          // Optionally, reset the form after submission
          resetForm();
        }}
      >
        {({ handleSubmit, values, handleChange }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <label htmlFor="inputField">Enter something:</label>
              <Field
                type="text"
                id="inputField"
                name="inputField"
                value={
                  values.inputField.startsWith("AAA_")
                    ? values.inputField // If already starts with "AAA_", leave it unchanged
                    : values.inputField.startsWith("AAA") 
                      ? "AAA_" + values.inputField.substr(3) // Remove "AAA_" if it exists
                      : "AAA_" + values.inputField // Prepend "AAA_" if it doesn't start with "AAA" or "AAA_"
                }
                onChange={handleChange}
              />
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
      <Footer />
    </div>
    
  
  );
};

export default MyForm;
