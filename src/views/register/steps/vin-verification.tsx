import React from "react";
import CustomButton from "../../../components/buttons/custom-button";
import Input from "../../../components/inputs/input";
import { MemberCreateInput } from "../../../generated/graphql";
import styles from "./steps.module.scss";

interface Props {
  prevStep: () => void;
  nextStep: () => void;
  formState: MemberCreateInput;
  setFormData: (formData: MemberCreateInput) => void;
}

export const VinVerification: React.FC<Props> = (props) => {
  const { formState, nextStep, prevStep } = props;
  return (
    <div className={styles.container}>
      <Input
        label="VIN"
        value=""
        handleChange={() => {}}
        placeholder={"Enter Your VIN"}
      />

      <div className={styles.button_container}>
        <CustomButton title="Previous" onClickHandler={prevStep} />
        <CustomButton title="Next" onClickHandler={nextStep} />
      </div>
    </div>
  );
};

export default VinVerification;
