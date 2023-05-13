import React from "react";
import { ICreateBankAccountForm } from "../bank-account-form";
import styles from "./steps.module.scss";
import Input from "../../../../components/inputs/input";
import SelectComp, { ISelectOption } from "../../select/select-comp";
import { useAppDispatch } from "../../../../redux/hooks";
import { createNgnAccountsThunk } from "../../../../redux/features/virtual-account/createNgnAccountThunk";
import { Formik } from "formik";
import * as Yup from "yup";
import { TfiFiles } from "react-icons/tfi";

const currencyOptions: ISelectOption[] = [
  {
    label: "Banc-Corp MFB",
    value: "Banc-Corp MFB",
    imgUrl: "/assets/logos/banc-corp_logo.png",
  },
  {
    label: "FCMB",
    value: "FCMB",
    imgUrl: "/assets/logos/fcmb_logo.png",
  },
  {
    label: "Providus",
    value: "Providus",
    imgUrl: "/assets/logos/providus.png",
  },
  {
    label: "Wema",
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

const initialValues = {
  accountAlias: "",
  bank: "",
};

const validationSchema = Yup.object().shape({
  accountAlias: Yup.string().required("please enter an account alias"),
  bank: Yup.string().required("please select a bank"),
});

export const BusinessAccountDetails: React.FC<Props> = ({
  formState,
  nextStep,
  prevStep,
  setFormData,
  handleSubmitRequest,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.step}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setFormData({
            ...formState,
            accountAlias: values.accountAlias,
            bank: values.bank,
          });

          await dispatch(
            createNgnAccountsThunk({
              args: {
                currency: "NGN",
                accountType: "corporate",

                KYCInformation: {
                  bvn: formState.bvn,
                  businessName: "Doow Nigeria Ltd",
                },
              },
              alias: values.accountAlias,
            })
          );

          handleSubmitRequest();
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className={styles.content_section}>
              <div className={styles.info_container}>
                <p>Account Name</p>
                <div className={styles.documents}>
                  <p>Doow Nigeria Ltd</p>
                </div>
              </div>
              <div className={styles.info_container}>
                <p>Account Alias</p>
                <Input
                  value={values.accountAlias}
                  handleChange={handleChange("accountAlias")}
                  error={
                    touched.accountAlias && errors.accountAlias
                      ? errors.accountAlias
                      : undefined
                  }
                />
              </div>
              <div className={styles.dropdown}>
                <SelectComp
                  title="Select Bank"
                  label="Select Bank"
                  options={currencyOptions}
                  onChange={handleChange("bank")}
                  error={touched.bank && errors.bank ? errors.bank : undefined}
                />
              </div>
            </div>
            {/* update the implementation for the click event below*/}
            <button className={styles.button} onClick={() => {}}>
              Request
            </button>
          </>
        )}
      </Formik>
    </div>
  );
};

export default BusinessAccountDetails;
