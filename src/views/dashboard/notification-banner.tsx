import React from "react";
import Modal from "./create-bank-account/modal";
import styles from "./create-bank-account/bank-account-form.module.scss";

interface Props {
  handleCloseForm: () => void;
  closeMessage: () => void;
}

export const NotificationBanner: React.FC<Props> = ({
  handleCloseForm,
  closeMessage,
}) => {
  return (
    <div>
      <Modal onClick={handleCloseForm} />
      <div className={styles.container}>
        <h2>Message</h2>

        <div className={styles.message_box}>
          <p>
            Your new NGN business account is being processed. You will receive a
            confirmation email shortly
          </p>
        </div>
        <button className={styles.button} onClick={closeMessage}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;
