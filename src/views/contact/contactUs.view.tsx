import LandingNavBar from "../home/navbar/navbar.comp";
import styles from "./contactUs.module.scss";
import React, { useState } from "react";
import FooterHome from "../home/footer/footer.comp";
import { InputButton, InputText } from "../../comps/forms";
import WaitListModal from "./modal";
import { TopSection } from "../terms-privacy/comps";

export function ContactUsView() {
  const [showSuccessful, setshowSuccessful] = useState(false);
  return (
    <div>
      <LandingNavBar />
      <TopSection
        title={"Contact Us"}
        subtitle={" Send us a message and someone will be in touch shortly."}
      />
      <div className={styles.container}>
        <div className={styles.content}>
          {/* <div className={styles.topContent}>
            <h1>Hey there!</h1>
            <p>How can we help you?</p>
          </div> */}

          <div className={styles.formSection}>
            <form onSubmit={(e) => e.preventDefault()}>
              <InputText
                label={"First name"}
                placeholder={"First name"}
                name={"firstname"}
                id={"firstname"}
                onChange={function (): void {}}
              />
              <InputText
                label={"Last name"}
                placeholder={"Last name"}
                name={"lastname"}
                id={"lastname"}
                onChange={function (): void {}}
              />
              <InputText
                label={""}
                placeholder={"mark@work-email.com"}
                name={"workemail"}
                id={"workemail"}
                onChange={function (): void {}}
              />

              <textarea placeholder="Comments" />
              <InputButton
                name={"Send message"}
                onClick={() => setshowSuccessful(true)}
              />
              {showSuccessful && (
                <WaitListModal
                  heading={"doow"}
                  content={`
                You are now on the waitlist.
                We can't wait to show you what Cross-border business banking should feel like.
              `}
                  onClose={() => setshowSuccessful(false)}
                  name={"Joe"}
                />
              )}
            </form>
          </div>
        </div>
      </div>
      <FooterHome />
    </div>
  );
}
