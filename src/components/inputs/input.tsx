import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "./input.module.scss";

interface Props {
  label?: string;
  value: string | number;
  type?: "number" | "text" | "email" | "password" | "date";
  placeholder?: string;
  error?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = (props) => {
  const { label, value, type, placeholder, error, handleChange } = props;
  const [showPrivacy, setShowPrivacy] = useState<boolean>(false);

  const togglePrivacy = () => {
    setShowPrivacy((prevState) => !prevState);
  };

  return (
    <div className={styles.inputs_container}>
      {label && <label htmlFor={label}>{label}</label>}
      <div className={styles.input_box}>
        <input
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          id={label}
          max={type === "date" ? "2005-03-03" : ""}
          min={type === "date" ? "1923-03-03" : ""}
          type={type === "password" ? (showPrivacy ? "text" : type) : type}
        />
        {type === "password" &&
          (showPrivacy ? (
            <AiOutlineEyeInvisible onClick={togglePrivacy} size={20} />
          ) : (
            <AiOutlineEye onClick={togglePrivacy} size={20} />
          ))}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Input;
