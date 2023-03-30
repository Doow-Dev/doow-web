import React from "react";
import { ICreateBankAccountForm } from "../bank-account-form";
import styles from "./steps.module.scss";
import Input from "../../../../components/inputs/input";
import SelectComp, { ISelectOption } from "../../select/select-comp";
import { useAppDispatch } from "../../../../redux/hooks";
import { createNgnAccountsThunk } from "../../../../redux/features/virtual-account/createNgnAccountThunk";
import { Formik } from "formik";
import * as Yup from "yup";

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
  bvn: "",
  accountAlias: "",
  bank: "",
};

const validationSchema = Yup.object().shape({
  bvn: Yup.string()
    .required("please enter a BVN")
    .length(11, "BVN must be 11 characters"),
  accountAlias: Yup.string().required("please enter an account alias"),
  bank: Yup.string().required("please select a bank"),
});

export const BvnVerification: React.FC<Props> = ({
  formState,
  nextStep,
  prevStep,
  setFormData,
  handleSubmitRequest,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.step}>
      <p className={styles.info}>
        In line with regulatory requirements, we need to validate the Bank
        Verification Number(BVN) of at least one company director to offer you
        an NGN business account
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log({ values });
          setFormData({
            ...formState,
            accountAlias: values.accountAlias,
            bvn: values.bvn,
            bank: values.bank,
          });

          await dispatch(
            createNgnAccountsThunk({
              currency: "NGN",
              accountType: "corporate",

              KYCInformation: {
                bvn: values.bvn,
                businessName: values.accountAlias,
              },
            })
          );

          handleSubmitRequest();
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className={styles.content_section}>
              <div className={styles.info_container}>
                <p>Director</p>
                <div className={styles.documents}>
                  <p>Abisoye Tolani</p>
                </div>
              </div>
              <div className={styles.dropdown}>
                <Input
                  label="BVN"
                  value={values.bvn}
                  handleChange={handleChange("bvn")}
                  type={"password"}
                  error={touched.bvn && errors.bvn ? errors.bvn : undefined}
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
            <button className={styles.button} onClick={() => handleSubmit()}>
              Request
            </button>
          </>
        )}
      </Formik>
    </div>
  );
};

export default BvnVerification;
