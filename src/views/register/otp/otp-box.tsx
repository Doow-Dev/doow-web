import React, { ChangeEvent, useState } from "react";
import OtpItem from "./otp-item";
import { toast } from "react-toastify";
import styles from "./otp.module.scss";
import { CustomButton } from "../../../components/buttons/custom-button";

interface Props {
  handleNext: () => void;
  handlePrev: () => void;
  receivedOtp: string;
}

let currentOtpIndex: number = 0;

export const OtpBox: React.FC<Props> = ({
  handleNext,
  receivedOtp,
  handlePrev,
}) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    setOtp([
      ...otp.map((digit, idx) => (idx === currentOtpIndex ? value : digit)),
    ]);

    if (!value) {
      setActiveOtpIndex(currentOtpIndex - 1);
    } else {
      setActiveOtpIndex(currentOtpIndex + 1);
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");
    if (receivedOtp === enteredOtp) {
      toast.success(`OTP verified successfully`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleNext();
    } else {
      toast.error("Invalid OTP entered.");
    }
  };

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOtpIndex = index;
    if (key === "Backspace") {
      setActiveOtpIndex(index - 1);
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.otp_box}>
        {otp.map((digit, i) => (
          <OtpItem
            activeOtpIndex={activeOtpIndex}
            index={i}
            handleChange={handleChange}
            handleKeyDown={handleOnKeyDown}
            value={digit}
            key={i}
          />
        ))}
      </div>
      <div className={styles.button_container}>
        <CustomButton title="Previous" onClickHandler={handlePrev} />
        <CustomButton title="Next" onClickHandler={handleVerifyOtp} />
      </div>
    </div>
  );
};

export default OtpBox;
