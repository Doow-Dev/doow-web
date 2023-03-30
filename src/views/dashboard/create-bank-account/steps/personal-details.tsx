import React from "react";
import { ICreateBankAccountForm } from "../bank-account-form";
import styles from "./steps.module.scss";
import Input from "../../../../components/inputs/input";
import SelectComp, { ISelectOption } from "../../select/select-comp";
import { useAppDispatch } from "../../../../redux/hooks";
import { createNgnAccountsThunk } from "../../../../redux/features/virtual-account/createNgnAccountThunk";
import { Formik } from "formik";
import * as Yup from "yup";
import { TfiFiles } from "react-icons/tfi";

interface Props {
  prevStep: () => void;
  nextStep: () => void;
  formState: ICreateBankAccountForm;
  setFormData: (formData: ICreateBankAccountForm) => void;
  handleSubmitRequest: () => void;
}

const initialValues = {
  bvn: "22843796374",
};

const validationSchema = Yup.object().shape({
  bvn: Yup.string()
    .required("please enter a BVN")
    .length(11, "BVN must be 11 characters"),
});

export const PersonalDetails: React.FC<Props> = ({
  formState,
  nextStep,
  prevStep,
  setFormData,
  handleSubmitRequest,
}) => {
  return (
    <div className={styles.step}>
      <p className={styles.info}>
        In line with regulatory requirements, we need to validate the Bank
        Verification Number(BVN) of at least one company director to offer you
        an NGN business account
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setFormData({
            ...formState,
            bvn: values.bvn,
          });
          nextStep();
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className={styles.content_section}>
              <div className={styles.info_container}>
                <p>Director</p>
                <div className={styles.documents}>
                  <p>Abisoye Tolani</p>
                </div>
              </div>
              <div className={styles.dropdown}>
                <Input
                  label="BVN"
                  value={values.bvn}
                  handleChange={handleChange("bvn")}
                  type={"password"}
                  error={touched.bvn && errors.bvn ? errors.bvn : undefined}
                />
              </div>{" "}
              <div className={styles.info_container}>
                <p>International Passport</p>
                <div className={styles.documents}>
                  <TfiFiles />
                  <p>1 uploaded file</p>
                </div>
              </div>
            </div>
            <div className={styles.button_container}>
              <button className={styles.button} onClick={prevStep}>
                Back
              </button>
              <button className={styles.button} onClick={() => handleSubmit()}>
                Next
              </button>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default PersonalDetails;
