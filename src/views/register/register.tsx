import Head from "next/head";
import { useState } from "react";
import { MemberCreateInput } from "../../generated/graphql";
import LandingNavBar from "../home/navbar/navbar.comp";
import styles from "./register.module.scss";
import {
  StateInfo,
  NinVerification,
  OtpVerification,
  ProvidePhone,
  // VinVerification,
  PersonalInfo,
  CreatePassword,
} from "./steps";
import ContactInfo from "./steps/contact-info";

const stepTitle = [
  "NIN Verfication",
  // "VIN Verification",
  "OTP Verification",
  "OTP Verification",
  "State Information",
  "Personal Information",
  "Contact Information",
  "Create Password",
];

const RegisterView = () => {
  const [step, setStep] = useState<number>(1);
  const [formState, setFormState] = useState<MemberCreateInput>({
    address: "",
    email: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    password: "",
    lga_id: -9999,
    state_id: -9999,
    ward_id: -9999,
    phone: "",
  });

  const numberOfSteps = stepTitle.length;

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

  const getRegStep = () => {
    switch (step) {
      case 1:
        return (
          <NinVerification
            formState={formState}
            nextStep={nextStep}
            prevStep={prevStep}
            setFormData={setFormState}
          />
        );
      // case 2:
      //   return (
      //     <VinVerification
      //       formState={formState}
      //       setFormData={setFormState}
      //       nextStep={nextStep}
      //       prevStep={prevStep}
      //     />
      //   );
      case 2:
        return (
          <ProvidePhone
            formState={formState}
            setFormData={setFormState}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <OtpVerification
            formState={formState}
            setFormData={setFormState}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <StateInfo
            formState={formState}
            setFormData={setFormState}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <PersonalInfo
            formState={formState}
            setFormData={setFormState}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 6:
        return (
          <ContactInfo
            formState={formState}
            setFormData={setFormState}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 7:
        return (
          <CreatePassword
            setFormData={setFormState}
            formState={formState}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
    }
  };
  return (
    <div>
      <Head>
        <title>register</title>
        <meta
          name="description"
          content="The registeration page of DOOW members"
        />
        <link rel="icon" href="/assets/images/apc-logo.png" />
      </Head>
      <div className={styles.register}>
        <LandingNavBar />
        <div className={styles.container}>
          <h2>{stepTitle[step - 1]}</h2>
          <div className={styles.form_container}>{getRegStep()}</div>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
