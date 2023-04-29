import LandingNavBar from "../home/navbar/navbar.comp";
import styles from "./waitlist.module.scss";
import React, { useState } from "react";
import FooterHome from "../home/footer/footer.comp";
import { InputButton, InputSelect, InputText } from "../../comps/forms";
import WaitListModal from "./modal";
import ToastMessage from "../../comps/toast/toast";
import { AddToWaitlistResponse } from "../../dto/waitlist";
import { formartNumberToWords } from "../../helper/numberFIlter";
import { TopSection } from "../terms/comps";
import Loading from "../../components/loading/loading";
import { listOfRoles } from "./listOfRoles";
import { WaitlisthandleSubmit } from "./handlesubmit";
import styled from "styled-components";
import Link from "next/link";

export function WaitList() {
  const [showModalSuccessful, setshowModalSuccessful] = useState(false);
  const [showOthersFormField, setShowOthersFormField] = useState(false);
  const [sentSuccessful, setsentSuccessful] = useState(false);
  const [showLoader, setLoader] = useState(false);
  const [warningMsg, setWarningMsg] = useState(false);
  const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);
  const [waitlist, setWaitlistData] = useState<AddToWaitlistResponse>();

  const [waitlistDto, setWaitlist] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company_name: "",
    role: "",
  });

  return (
    <div>
      <LandingNavBar />
      {sentSuccessful && (
        <ToastMessage type={"success"} message={"Added successfully"} />
      )}
      {warningMsg && (
        <ToastMessage message="Kindly fill all fields" type="error" />
      )}
      {emailAlreadyExist && (
        <ToastMessage
          message="Thanks, email is already on the waitlist"
          type="info"
        />
      )}

      {showLoader && <Loading />}
      <TopSection
        title={"Join the waitlist!"}
        subtitle={`
         Our global spend management platform helps companies streamline
              their finance workflow so decision makers can easily analyze
              patterns and make data informed decisions in real time
      `}
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <form onSubmit={(e) => e.preventDefault()}>
            <InputText
              label={"First name"}
              name={"first_name"}
              value={waitlistDto.first_name}
              placeholder={"First name"}
              id={"first_name"}
              onChange={(e) => {
                setWaitlist({
                  ...waitlistDto,
                  first_name: e.target.value,
                });
              }}
            />

            <InputText
              label={"Last name"}
              placeholder={"Last name"}
              name={"last_name"}
              value={waitlistDto.last_name}
              id={"last_name"}
              onChange={(e) => {
                setWaitlist({
                  ...waitlistDto,
                  last_name: e.target.value,
                });
              }}
            />

            <InputText
              label={"Company"}
              placeholder={"Company name"}
              name={"Company"}
              value={waitlistDto.company_name}
              id={"Company"}
              onChange={(e) =>
                setWaitlist({
                  ...waitlistDto,
                  company_name: e.target.value,
                })
              }
            />
            <InputText
              label={"Email"}
              placeholder={"Email"}
              name={"email"}
              value={waitlistDto.email}
              id={"email"}
              onChange={(e) =>
                setWaitlist({
                  ...waitlistDto,
                  email: e.target.value,
                })
              }
            />

            <InputSelect
              title={"Role in your company"}
              optionsParams={[...listOfRoles]}
              value={waitlistDto.role}
              onChange={(e) => {
                if (e.target.value !== "other") {
                  setWaitlist({
                    ...waitlistDto,
                    role: e.target.value,
                  });
                  setShowOthersFormField(false);
                } else {
                  setWaitlist({
                    ...waitlistDto,
                    role: "",
                  });
                  setShowOthersFormField(true);
                }
                console.log(e.target.value);
              }}
            />
            {showOthersFormField && (
              <InputText
                label={"Other role"}
                placeholder={"Role in company"}
                name={"other"}
                value={waitlistDto.role}
                id={"role"}
                onChange={(e) =>
                  setWaitlist({
                    ...waitlistDto,
                    role: e.target.value,
                  })
                }
              />
            )}
            <InputButton
              name={"Join"}
              onClick={() =>
                WaitlisthandleSubmit({
                  setLoader,
                  setsentSuccessful,
                  setshowModalSuccessful,
                  setEmailAlreadyExist,
                  setWarningMsg,
                  setWaitlist,
                  waitlistDto,
                  setWaitlistData,
                })
              }
            />
            <p className={styles.bottom_msg}>
              By submitting this form, you agree to our{" "}
              <Link href="/terms_of_use">Terms </Link> and have read and
              acknowledge our <Link href="/privacy_policy">Privacy Policy</Link>{" "}
              document. 9:44 We need your work email to ensure we are dealing
              with a business customer.
            </p>
            {showModalSuccessful && (
              <WaitListModal
                heading={"doow"}
                position={`You are ${formartNumberToWords(
                  waitlist.count
                )} in line`}
                content={`
                  You are ${formartNumberToWords(
                    waitlist.count
                  )} in line. We can't wait to show you what
                  Cross-border business banking should feel like.
                `}
                onClose={() => setshowModalSuccessful(false)}
                name={`Thank you, ${waitlist.first_name}!`}
                content2={
                  "Please, can you spare less than 8 mins for a product chat with us?"
                }
                btnVal={"Let's do this"}
              />
            )}
          </form>
        </div>
      </div>
      <FooterHome />
    </div>
  );
}
