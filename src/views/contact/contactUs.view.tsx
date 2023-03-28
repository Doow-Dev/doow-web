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
      {/* <WaitlistLanding /> */}

      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <AboutSection>
              <AboutTitle>Hey there!</AboutTitle>
              <AboutBody>How can we help you?</AboutBody>
              <br />
              <br />
              <AboutTitle>Doow Inc.</AboutTitle>
              {/* <AboutSubtitle>Doow Inc.</AboutSubtitle> */}
              <AboutBody>
                Location: 1736, 1007 N Orange St. 4th Floor, Willington, DE, New
                Castle, United States, 19801
              </AboutBody>
              <AboutBody>Email: support@doow.co</AboutBody>
              <AboutBody>Social Media: LinkedIn, Twitter</AboutBody>
            </AboutSection>
          </div>

          <div className={styles.formSection}>
            <p className={styles.topMessage}>
              Send us a message and someone will be in touch shortly.
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <InputText
                label={"First name"}
                name={"first_name"}
                placeholder={"First name"}
                id={"first_name"}
                onChange={function (): void {}}
              />

              <InputText
                label={"Last name"}
                placeholder={"Last name"}
                name={"last_name"}
                id={"last_name"}
                onChange={function (): void {}}
              />
              <InputText
                label={"Company name"}
                placeholder={"Company name"}
                name={"company_name"}
                id={"company_name"}
                onChange={function (): void {}}
              />

              <InputText
                label={"Work Email"}
                placeholder={"mark@work-email.com"}
                name={"workemail"}
                id={"workemail"}
                onChange={function (): void {}}
              />

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
