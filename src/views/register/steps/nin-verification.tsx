import React, { useState } from "react";
import CustomButton from "../../../components/buttons/custom-button";
import Input from "../../../components/inputs/input";
import { MemberCreateInput } from "../../../generated/graphql";
import styles from "./steps.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import { verifyNin } from "../../../utils/helpers";
import { toast } from "react-toastify";
import Loading from "../../../components/loading/loading";

interface Props {
  prevStep: () => void;
  nextStep: () => void;
  formState: MemberCreateInput;
  setFormData: (formData: MemberCreateInput) => void;
}

const initialValues = {
  nin: "",
};

const validationSchema = Yup.object().shape({
  nin: Yup.string()
    .required("Please enter your NIN")
    .min(10, "Minimum length required is 10")
    .max(11, "Maximum length required is 11"),
});

export const NinVerification: React.FC<Props> = (props) => {
  const { formState, nextStep, prevStep } = props;
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      {loading && <Loading />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log(values);
          setLoading(true);
          try {
            const resp = await verifyNin(values.nin + "");
            if (resp) {
              setLoading(false);
              nextStep();
              toast.success("NIN verification successful");
            }
          } catch (err) {
            setLoading(false);
            toast.error("Verification failed, try again");
          }
        }}
      >
        {({ errors, values, touched, handleChange, handleSubmit }) => (
          <>
            <Input
              label="NIN"
              value={values.nin}
              type="number"
              handleChange={handleChange("nin")}
              placeholder={"Enter Your NIN"}
              error={touched.nin && errors.nin}
            />

            <div className={styles.button_container}>
              <CustomButton title="Next" onClickHandler={handleSubmit} />
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default NinVerification;
