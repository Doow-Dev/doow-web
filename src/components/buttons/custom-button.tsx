import React from "react";
import styles from "./custom-button.module.scss";

interface Props {
  title: string;
  bgColor?: string;
  height?: string;
  type?: "button" | "submit" | "reset";
  titleColor?: string;
  onClickHandler?: () => void;
}

export const CustomButton: React.FC<Props> = (props) => {
  const { title, bgColor, height, onClickHandler, titleColor, type } = props;
  return (
    <button className={styles.button} type={type} onClick={onClickHandler}>
      <p>{title}</p>
    </button>
  );
};

export default CustomButton;
