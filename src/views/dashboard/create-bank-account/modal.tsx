import React, { ReactNode } from "react";
import styles from "./modal.module.scss";

interface Props {
  onClick: () => void;
}

export const Modal: React.FC<Props> = ({ onClick }) => {
  return <div className={styles.modal}></div>;
};

export default Modal;
