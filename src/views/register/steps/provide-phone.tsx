import React, { useContext, useState } from "react";
import CustomButton from "../../../components/buttons/custom-button";
import Input from "../../../components/inputs/input";
import styles from "./steps.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import MenuContext from "../../../context/drop-menu-context";
import { MemberCreateInput } from "../../../generated/graphql";
import Modal from "../../../comps/modal";

interface Props {
  prevStep: () => void;
  nextStep: () => void;
  formState: MemberCreateInput;
  setFormData: (formData: MemberCreateInput) => void;
}

const initialValues = {
  phone: "",
};

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .required("phone number is required")
    .matches(
      /^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/,
      "please enter a valid phone number"
    ),
});

export const ProvidePhone: React.FC<Props> = (props) => {
  const { formState, nextStep, prevStep, setFormData } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const { closeMenu, open } = useContext(MenuContext);
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setShowModal(true);

          // implement phone verification and sending of OTP here

          // if everything goes well, move to next step
          const phone = "0" + values.phone;
          setFormData({ ...formState, phone });
          nextStep();
        }}
      >
        {({ errors, values, handleChange, handleSubmit, touched }) => (
          <>
            <Input
              type="number"
              label="Phone"
              value={values.phone}
              handleChange={handleChange("phone")}
              placeholder={"Enter Your Phone Number"}
              error={touched.phone && errors.phone}
            />
            <div className={styles.button_container}>
              <CustomButton title="Previous" onClickHandler={prevStep} />
              <CustomButton title="Next" onClickHandler={handleSubmit} />
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default ProvidePhone;
