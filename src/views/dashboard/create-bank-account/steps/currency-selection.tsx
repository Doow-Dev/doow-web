import React, { useState } from "react";
import { SelectDropdown } from "../../../../components/inputs/select-dropdown";
import Select from "../../../../components/select/select";
import IconSelect from "../../select/icon-select";
import SelectComp, { ISelectOption } from "../../select/select-comp";
import { ICreateBankAccountForm } from "../bank-account-form";
import styles from "./steps.module.scss";

const currencyOptions: ISelectOption[] = [
  {
    value: "EUR Account",
    imgUrl: "/assets/flags/euro.png",
  },
  {
    value: "GBP Account",
    imgUrl: "/assets/flags/british.png",
  },
  {
    value: "USD Account",
    imgUrl: "/assets/flags/usa.jpg",
  },
  {
    value: "KES Account",
    imgUrl: "/assets/flags/kenya.jpg",
  },
  {
    value: "Nigerian (NGN) Business account",
    imgUrl: "/assets/flags/nigeria.png",
  },
];

interface Props {
  prevStep: () => void;
  nextStep: () => void;
  formState: ICreateBankAccountForm;
  setFormData: (formData: ICreateBankAccountForm) => void;
}

export const CurrencySelection: React.FC<Props> = ({
  formState,
  nextStep,
  prevStep,
  setFormData,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleRequestAccount = () => {
    if (selectedValue) {
      nextStep();
    } else {
      setErrorMsg("select an option");
    }
  };
  const handleSelectCurrency = (value: string) => {
    setErrorMsg("")
    setSelectedValue(value);
    setFormData({ ...formState, currency: value });
  };
  return (
    <div className={styles.step}>
      <p className={styles.info}>
        Create foreign accounts in EUR, GBP, USD, KES and NGN from anywhere
      </p>
      <div className={styles.dropdown}>
        <SelectComp
          title="Currency"
          label="Select Currency"
          options={currencyOptions}
          onChange={(value) => {
            handleSelectCurrency(value);
          }}
          error={errorMsg}
        />
      </div>
      <button className={styles.button} onClick={handleRequestAccount}>
        Request Account
      </button>
    </div>
  );
};

export default CurrencySelection;
