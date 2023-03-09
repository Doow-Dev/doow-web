import React from "react";
import styles from "./modal.module.scss";

interface IModal {
  heading: string;
  content: string;
  onClose: () => void;
}
export default function ModalComp(props: IModal) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.sectionTitle}>
          <h3>{props.heading}</h3>
        </div>
        <div className={styles.sectionContent}>
          <p>{props.content}</p>
        </div>
        <div className={styles.sectionContent}>
          <input
            type="button"
            className="btn"
            value="Close"
            onClick={props.onClose}
          />
        </div>
      </div>
    </div>
  );
}
