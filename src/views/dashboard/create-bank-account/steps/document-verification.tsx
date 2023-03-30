import React from "react";
import { ICreateBankAccountForm } from "../bank-account-form";
import styles from "./steps.module.scss";
import { TfiFiles } from "react-icons/tfi";

interface Props {
  prevStep: () => void;
  nextStep: () => void;
  formState: ICreateBankAccountForm;
  setFormData: (formData: ICreateBankAccountForm) => void;
}

export const DocumentVerification: React.FC<Props> = ({
  formState,
  nextStep,
  prevStep,
  setFormData,
}) => {
  return (
    <div className={styles.step}>
      <div className={styles.content_section}>
        <div className={styles.info_container}>
          <p>Registration Documents</p>
          <div className={styles.documents}>
            <TfiFiles />
            <p>6 uploaded files</p>
          </div>
        </div>
        <div className={styles.info_container}>
          <p>Directors</p>
          <div className={styles.documents}>
            <p>Osei Gyann and Abisoye Tolani</p>
          </div>
        </div>
        <div className={styles.info_container}>
          <p>Beneficial Owners</p>
          <div className={styles.documents}>
            <p>Osei Gyann and Abisoye Tolani</p>
          </div>
        </div>

        <div className={styles.button_container}>
          <button className={styles.button} onClick={prevStep}>
            Back
          </button>
          <button className={styles.button} onClick={nextStep}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerification;
