import React from "react";
import styles from "./modal.module.scss";

interface IModal {
  heading: string;
  name: string;
  content: string;
  position: string;
  onClose: () => void;
}
export default function WaitListModal(props: IModal) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.sectionContent}>
          <h1>Thank you {props.name}</h1>
          <p>{props.content}</p>
        </div>
        <div className={styles.sectionContent}>
          <h1>{props.position}</h1>
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
