import React from "react";
import CustomButton from "../../../components/buttons/custom-button";
import Input from "../../../components/inputs/input";
import styles from "./steps.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { MemberCreateInput } from "../../../generated/graphql";
import { Formik } from "formik";
import * as Yup from "yup";

interface Props {
  prevStep: () => void;
  nextStep: () => void;
  formState: MemberCreateInput;
  setFormData: (formData: MemberCreateInput) => void;
}

const initialValues = {
  phone: "",
  alt_phone: "",
  email: "",
  address: "",
};

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .required("phone number is required")
    .matches(
      /^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/,
      "please enter a valid phone number"
    ),
  alt_phone: Yup.string().matches(
    /^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/,
    "please enter a valid phone number"
  ),
  email: Yup.string()
    .required("email is required")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please enter a valid email"
    ),
  address: Yup.string().required("address is required"),
});

export const ContactInfo: React.FC<Props> = (props) => {
  const { formState, nextStep, prevStep, setFormData } = props;

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const phone = "0" + values.phone;

          const alt_phone = values.alt_phone ? "0" + values.alt_phone : "";
          const pickedValues = { ...values, phone, alt_phone };
          setFormData({ ...formState, ...pickedValues });
          nextStep();
        }}
      >
        {({ errors, values, touched, handleChange, handleSubmit }) => (
          <>
            <div className={styles.inputs_form}>
              <Input
                label="Phone"
                type="number"
                value={values.phone}
                handleChange={handleChange("phone")}
                error={touched.phone && errors.phone}
              />
              <Input
                label="Alternative Phone"
                type="number"
                value={values.alt_phone}
                handleChange={handleChange("alt_phone")}
                error={touched.alt_phone && errors.alt_phone}
              />
              <Input
                label="Email"
                type="email"
                value={values.email}
                handleChange={handleChange("email")}
                error={touched.email && errors.email}
              />
              <Input
                label="Address"
                value={values.address}
                handleChange={handleChange("address")}
                error={touched.address && errors.address}
              />
            </div>
            <div className={styles.button_container}>
              <CustomButton title="Previous" onClickHandler={prevStep} />
              <CustomButton
                title="Next"
                onClickHandler={() => handleSubmit()}
              />
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default ContactInfo;
