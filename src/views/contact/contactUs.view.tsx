import LandingNavBar from "../home/navbar/navbar.comp";
import styles from "./contactUs.module.scss";
import React, { useState } from "react";
import FooterHome from "../home/footer/footer.comp";
import { InputButton, InputText } from "../../comps/forms";
import {
  AboutBody,
  AboutSection,
  AboutSubtitle,
  AboutTitle,
} from "../about/comps";
import WaitListModal from "./modal";

export function ContactUsView() {
  const [showSuccessful, setshowSuccessful] = useState(false);
  return (
    <div>
      <LandingNavBar />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.topContent}>
            <h1>Hey there!</h1>
            <p>How can we help you?</p>
          </div>

          <div className={styles.formSection}>
            <p className={styles.topMessage}>
              Send us a message and someone will be in touch shortly.
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
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
