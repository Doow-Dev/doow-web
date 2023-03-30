import LandingNavBar from "../home/navbar/navbar.comp";
import styles from "./waitlist.module.scss";
import Link from "next/link";
import React, { useState } from "react";
import { WaitlistLanding } from "./Landing/Landing";
import FooterHome from "../home/footer/footer.comp";
import { InputButton, InputText } from "../../comps/forms";
import { AboutBody, AboutSection, AboutTitle } from "../about/comps";
import WaitListModal from "./modal";

export function WaitList() {
  const [showSuccessful, setshowSuccessful] = useState(false);
  return (
    <div>
      <LandingNavBar />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.banner}>
            <h1>Join the waitlist!</h1>
            <p>
              Our global spend management platform helps companies streamline
              their finance workflow so decision makers can easily analyze
              patterns and make data informed decisions in real time
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <InputText
              label={"First name"}
              name={"first_name"}
              placeholder={"First name"}
              id={"first_name"}
              onChange={function (): void {
                throw new Error("Function not implemented.");
              }}
            />

            <InputText
              label={"Last name"}
              placeholder={"Last name"}
              name={"last_name"}
              id={"last_name"}
              onChange={function (): void {
                throw new Error("Function not implemented.");
              }}
            />

            <InputText
              label={"Email"}
              placeholder={"Email"}
              name={"email"}
              id={"email"}
              onChange={function (): void {
                throw new Error("Function not implemented.");
              }}
            />

            <InputButton
              name={"Join"}
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
      <FooterHome />
    </div>
  );
}
