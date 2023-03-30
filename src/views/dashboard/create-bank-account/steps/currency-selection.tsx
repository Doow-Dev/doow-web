import { Formik } from "formik";
import React from "react";
import SelectComp, { ISelectOption } from "../../select/select-comp";
import { ICreateBankAccountForm } from "../bank-account-form";
import styles from "./steps.module.scss";
import * as Yup from "yup";

const currencyOptions: ISelectOption[] = [
  {
    label: "EUR Business Account",
    value: "EUR",
    imgUrl: "/assets/flags/euro.png",
  },
  {
    label: "GBP Business Account",
    value: "GBP",
    imgUrl: "/assets/flags/british.png",
  },
  {
    label: "USD Business Account",
    value: "USD",
    imgUrl: "/assets/flags/usa.jpg",
  },
  {
    label: "KES Business Account",
    value: "KES",
    imgUrl: "/assets/flags/kenya.jpg",
  },
  {
    label: "Nigerian (NGN) Business Account",
    value: "NGN",
    imgUrl: "/assets/flags/nigeria.png",
  },
];

interface Props {
  prevStep: () => void;
  nextStep: () => void;
  formState: ICreateBankAccountForm;
  setFormData: (formData: ICreateBankAccountForm) => void;
}

const initialValues = {
  currency: "",
};

const validationSchema = Yup.object().shape({
  currency: Yup.string().required("select a currency option"),
});

export const CurrencySelection: React.FC<Props> = ({
  formState,
  nextStep,
  prevStep,
  setFormData,
}) => {
  return (
    <div className={styles.step}>
      <p className={styles.info}>
        Create foreign accounts in EUR, GBP, USD, KES and NGN from anywhere
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setFormData({ ...formState, currency: values.currency });
          nextStep();
        }}
      >
        {({ errors, values, handleChange, handleSubmit, touched }) => (
          <>
            <div className={styles.dropdown}>
              <SelectComp
                title="Currency"
                label="Select Currency"
                options={currencyOptions}
                onChange={handleChange("currency")}
                error={
                  touched.currency && errors.currency
                    ? errors.currency
                    : undefined
                }
              />
            </div>
            <button className={styles.button} onClick={() => handleSubmit()}>
              Request Account
            </button>
          </>
        )}
      </Formik>
    </div>
  );
};

export default CurrencySelection;
