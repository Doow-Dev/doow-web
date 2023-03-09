import React, { useState } from "react";
import CustomButton from "../../../components/buttons/custom-button";
import Input from "../../../components/inputs/input";
import styles from "./steps.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import { MemberCreateInput } from "../../../generated/graphql";
import { signUp, useAuthDispatch } from "../../../context/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Loading from "../../../components/loading/loading";

interface Props {
  prevStep: () => void;
  nextStep: () => void;
  formState: MemberCreateInput;
  setFormData: (formData: MemberCreateInput) => void;
}

const initialValues = {
  password: "",
  confirm: "",
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Please enter a password")
    .min(6, "Minimum length required is 6"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Please confirm password"),
});

export const CreatePassword: React.FC<Props> = ({
  formState,
  nextStep,
  prevStep,
  setFormData,
}) => {
  const dispatch = useAuthDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      {loading && <Loading />}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setFormData({ ...formState, password: values.password });
          const signupInput = { ...formState, password: values.password };
          setLoading(true);
          try {
            await signUp(dispatch, { ...signupInput });
            toast.success("signup successfull");
            router.push("/profile");
            setLoading(false);
          } catch (error) {
            setLoading(false);
            toast.error("signup failed, try again");
          }
        }}
      >
        {({ errors, values, touched, handleChange, handleSubmit }) => (
          <>
            <div className={styles.inputs_form}>
              <Input
                label="Password"
                value={values.password}
                handleChange={handleChange("password")}
                error={touched.password && errors.password}
                type={"password"}
              />
              <Input
                label="Confirm Password"
                value={values.confirm}
                handleChange={handleChange("confirm")}
                error={touched.confirm && errors.confirm}
                type={"password"}
              />
            </div>
            <div className={styles.button_container}>
              <CustomButton title="Previous" onClickHandler={prevStep} />
              <CustomButton
                title="Submit"
                onClickHandler={() => handleSubmit()}
              />
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default CreatePassword;
