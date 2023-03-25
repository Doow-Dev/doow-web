import React, { useState } from "react";
import { ICreateBankAccountForm } from "../bank-account-form";
import styles from "./steps.module.scss";
import { TfiFiles } from "react-icons/tfi";
import Input from "../../../../components/inputs/input";
import SelectComp, { ISelectOption } from "../../select/select-comp";

const currencyOptions: ISelectOption[] = [
  {
    value: "Bancore MFB",
    imgUrl: "/assets/logos/banc-corp_logo.png",
  },
  {
    value: "FCMB",
    imgUrl: "/assets/logos/fcmb_logo.png",
  },
  {
    value: "Providus",
    imgUrl: "/assets/logos/providus.png",
  },
  {
    value: "Wema",
    imgUrl: "/assets/logos/wema-logo.png",
  },
];

interface Props {
  prevStep: () => void;
  nextStep: () => void;
  formState: ICreateBankAccountForm;
  setFormData: (formData: ICreateBankAccountForm) => void;
  handleSubmitRequest: () => void;
}

export const BvnVerification: React.FC<Props> = ({
  formState,
  nextStep,
  prevStep,
  setFormData,
  handleSubmitRequest,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");


  const handleRequest = () => {
    if (selectedValue) {
      handleSubmitRequest();
    }else{
      setErrorMsg("select a bank")
    }
  };

  const handleSelectbank = (value: string) => {
    setErrorMsg("")
    setSelectedValue(value);
    setFormData({ ...formState, bank: value });
  };

  return (
    <div className={styles.step}>
      <p className={styles.info}>
        In line with regulatory requirements, we need to validate the Bank
        Verification Number(BVN) of at least one company director to offer you
        an NGN business account
      </p>
      <div className={styles.content_section}>
        <div className={styles.info_container}>
          <p>Director</p>
          <div className={styles.documents}>
            <p>Abisoye Tolani</p>
          </div>
        </div>
        <div className={styles.dropdown}>
          <Input
            value={"678767788"}
            handleChange={() => {}}
            type={"password"}
          />
        </div>{" "}
        <div className={styles.info_container}>
          <p>Account Name</p>
          <div className={styles.documents}>
            <p>Doow Nigeria Ltd</p>
          </div>
        </div>
        <div className={styles.info_container}>
          <p>Account Alias</p>
          <Input value={""} handleChange={() => {}} />
        </div>
        <div className={styles.dropdown}>
          <SelectComp
            title="Select Bank"
            label="Select Currency"
            options={currencyOptions}
            onChange={(value) => {
              handleSelectbank(value);
            }}
            error={errorMsg}
          />
        </div>
      </div>
      <button className={styles.button} onClick={handleRequest}>
        Request
      </button>
    </div>
  );
};

export default BvnVerification;
