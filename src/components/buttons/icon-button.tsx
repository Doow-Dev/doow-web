import React from "react";
import styles from "./icon-button.module.scss";

interface Props {
  icon?: JSX.Element;
  title?: string;
  clickHandler?: () => void;
}

export const IconButton: React.FC<Props> = (props) => {
  const { icon, title, clickHandler } = props;
  return (
    <div className={styles.btnContainer} onClick={clickHandler}>
      {icon ? icon : ""}
      {title ? <p>{title}</p> : ""}
    </div>
  );
};

export default IconButton;
