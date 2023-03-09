import React, { ChangeEvent, MutableRefObject, useEffect, useRef } from "react";
import styles from "./otp.module.scss";

interface Props {
  value: string;
  index: number;
  activeOtpIndex: number;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
}

export const OtpItem: React.FC<Props> = ({
  value,
  handleChange,
  index,
  activeOtpIndex,
  handleKeyDown,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex, index]);

  return (
    <input
      ref={index === activeOtpIndex ? inputRef : null}
      className={styles.otp_item}
      type={"text"}
      maxLength={1}
      value={value}
      title={"otp"}
      onKeyDown={(e) => handleKeyDown(e, index)}
      onChange={(e) => handleChange(e, index)}
    />
  );
};

export default OtpItem;
