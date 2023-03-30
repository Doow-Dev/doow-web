import React from "react";
import Modal from "./create-bank-account/modal";
import styles from "./create-bank-account/bank-account-form.module.scss";
import { useAppSelector } from "../../redux/hooks";

interface Props {
  handleCloseForm: () => void;
  closeMessage: () => void;
}

export const NotificationBanner: React.FC<Props> = ({
  handleCloseForm,
  closeMessage,
}) => {
  const {
    data: { currency, accountInformation },
  } = useAppSelector((state) => state.virtualAccountState.newAccount);
  return (
    <div>
      <Modal onClick={handleCloseForm} />
      <div className={styles.container}>
        <h2>Message</h2>

        <div className={styles.message_box}>
          <img
            src="/assets/lotties/success.gif"
            className={styles.icon}
            alt="success icon"
          />
          <p>
            Your new {currency} business account,
            <span className={styles.accountNumber}>
              {" "}
              {accountInformation.accountNumber}
            </span>{" "}
            with{" "}
            <span className={styles.accountNumber}>
              {accountInformation.bankName}
            </span>{" "}
            is being processed. You will receive a confirmation email shortly
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
