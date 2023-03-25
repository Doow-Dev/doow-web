import React, { useState } from "react";
import Modal from "./modal";
import styles from "./bank-account-form.module.scss";
import Input from "../../../components/inputs/input";
import { CurrencySelection, DocumentVerification } from "./steps";
import BvnVerification from "./steps/bvn-verification";

const stepTitles = [
  "Setup a new business bank account",
  "Verify your business documents",
  "BVN Verification",
];

export interface ICreateBankAccountForm {
  accountName: string;
  currency: string;
  balance?: string;
  bank: string;
  countryFlag?: string;
  profileUrls?: string[];
}

interface Props {
  handleCloseForm: () => void;
}

export const BankAccountForm: React.FC<Props> = (props) => {
  const { handleCloseForm } = props;
  const [step, setStep] = useState<number>(1);
  const [formState, setFormState] = useState<ICreateBankAccountForm>({
    accountName: "",
    currency: "",
    bank: "",
  });

  const handleSubmitRequest = () => {
    handleCloseForm();
    console.log(formState);
  };

  const getStep = () => {
    switch (step) {
      case 1:
        return (
          <CurrencySelection
            formState={formState}
            nextStep={nextStep}
            prevStep={prevStep}
            setFormData={setFormState}
          />
        );
      case 2:
        return (
          <DocumentVerification
            formState={formState}
            nextStep={nextStep}
            prevStep={prevStep}
            setFormData={setFormState}
          />
        );
      case 3:
        return (
          <BvnVerification
            formState={formState}
            nextStep={nextStep}
            prevStep={prevStep}
            setFormData={setFormState}
            handleSubmitRequest={handleSubmitRequest}
          />
        );
    }
  };

  const numberOfSteps = stepTitles.length;

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const nextStep = () => {
    if (step < numberOfSteps) {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <div>
      <Modal onClick={handleCloseForm} />
      <div className={styles.container}>
        <h2>{stepTitles[step - 1]}</h2>
        <span className={styles.step}>
          {step}/{stepTitles.length}
        </span>

        <div className={styles.form_container}>{getStep()}</div>
      </div>
    </div>
  );
};

export default BankAccountForm;
