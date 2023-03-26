import React from "react";
import styles from "./modal.module.scss";

interface IModal {
  heading: string;
  name: string;
  content: string;
  onClose: () => void;
}
export default function WaitListModal(props: IModal) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.sectionContent}>
          <h1>Thank you {props.name}</h1>
          <p>
            You are now on the waitlist. We can't wait to show you what
            Cross-border business banking should feel like.
          </p>
        </div>
        <div className={styles.sectionContent}>
          <h1>You are the first in line.</h1>
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
