import React from "react";
import CustomButton from "../../../components/buttons/custom-button";
import { SelectDropdown } from "../../../components/inputs";
import Input from "../../../components/inputs/input";
import styles from "./steps.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { MaritalOptions } from "../t";
import { Marital_Status, MemberCreateInput } from "../../../generated/graphql";
import { Formik } from "formik";
import * as Yup from "yup";

interface Props {
  prevStep: () => void;
  nextStep: () => void;
  formState: MemberCreateInput;
  setFormData: (formData: MemberCreateInput) => void;
}

const initialValues = {
  first_name: "",
  last_name: "",
  middle_name: "",
  dob: "",
  occupation: "",
  // gender: "",
  marital_status: "",
};

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("first name is required"),
  last_name: Yup.string().required("last name is required"),
  middle_name: Yup.string(),
  occupation: Yup.string().required("occupation is required"),
  marital_status: Yup.string().required("please select an option"),
  // gender: Yup.string().required("please select an option"),
  dob: Yup.string().required("date of birth is required"),
});

export const PersonalInfo: React.FC<Props> = (props) => {
  const { formState, nextStep, prevStep, setFormData } = props;

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const marital_status =
            values.marital_status as unknown as Marital_Status;
          const pickedValues = { ...values, marital_status };
          setFormData({ ...formState, ...pickedValues });
          nextStep();
        }}
      >
        {({ errors, values, touched, handleChange, handleSubmit }) => (
          <>
            <div className={styles.inputs_form}>
              <Input
                label="First Name"
                value={values.first_name}
                handleChange={handleChange("first_name")}
                error={touched.first_name && errors.first_name}
              />
              <Input
                label="Last Name"
                value={values.last_name}
                handleChange={handleChange("last_name")}
                error={touched.last_name && errors.last_name}
              />
              <Input
                label="Middle Name"
                value={values.middle_name}
                handleChange={handleChange("middle_name")}
                error={touched.middle_name && errors.middle_name}
              />

              <Input
                label="Date of Birth"
                value={values.dob}
                type="date"
                handleChange={handleChange("dob")}
                placeholder={"Select Date"}
                error={touched.dob && errors.dob}
              />

              <Input
                label="Occupation"
                value={values.occupation}
                handleChange={handleChange("occupation")}
                error={touched.occupation && errors.occupation}
              />
              {/* <SelectDropdown
                options={GenderOptions}
                label="Gender"
                handleChange={handleChange("gender")}
                error={touched.gender && errors.gender}
              /> */}
              <SelectDropdown
                options={MaritalOptions}
                label="Marital Status"
                handleChange={handleChange("marital_status")}
                error={touched.marital_status && errors.marital_status}
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

export default PersonalInfo;
