import React from "react";
import Modal from "./create-bank-account/modal";
import styles from "./create-bank-account/bank-account-form.module.scss";
import { useAppSelector } from "../../redux/hooks";
import Lottie from "lottie-react";
import successAnimation from "../../../public/assets/lotties/success.json";

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
      <div className={styles.bannerContainer}>
        <h2>Message</h2>
        <div className={styles.message_box}>
          <Lottie
            animationData={successAnimation}
            loop={false}
            style={{ width: "80px", height: "80px" }}
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
