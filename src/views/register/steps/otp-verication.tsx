import React from "react";
import styles from "./steps.module.scss";
import OtpBox from "../otp/otp-box";
import { MemberCreateInput } from "../../../generated/graphql";

interface Props {
  prevStep: () => void;
  nextStep: () => void;
  formState: MemberCreateInput;
  setFormData: (formData: MemberCreateInput) => void;
}

export const OtpVerification: React.FC<Props> = (props) => {
  const { formState, nextStep, prevStep } = props;
  return (
    <div className={styles.container}>
      <p>Enter Received OTP to Continue</p>
      <OtpBox
        handleNext={nextStep}
        receivedOtp={"123456"}
        handlePrev={prevStep}
      />
    </div>
  );
};

export default OtpVerification;
