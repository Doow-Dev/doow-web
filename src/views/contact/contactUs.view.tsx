import LandingNavBar from "../home/navbar/navbar.comp";
import styles from "./contactUs.module.scss";
import React, { useState } from "react";
import FooterHome from "../home/footer/footer.comp";
import { InputButton, InputText } from "../../comps/forms";
import WaitListModal from "./modal";
import { TopSection } from "../terms/comps";
import axios from "axios";
import { TSupport } from "./contact";

export function ContactUsView() {
  const [showSuccessful, setshowSuccessful] = useState(false);

  const [supportVal, setSupportVal] = useState({
    first_name: "",
    last_name: "",
    email: "",
    comment: "",
  });

  const handleSubmit = async (data: TSupport) => {
    await axios
      .post(`https://api.doow.co/support`, data)
      .then((e) => {
        setshowSuccessful(true);
        setSupportVal({
          first_name: "",
          last_name: "",
          email: "",
          comment: "",
        });
      });
  };
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
                value={supportVal.first_name}
                onChange={(e) => {
                  setSupportVal({
                    ...supportVal,
                    first_name: e.target.value,
                  });
                }}
              />
              <InputText
                label={"Last name"}
                placeholder={"Last name"}
                name={"lastname"}
                id={"lastname"}
                value={supportVal.last_name}
                onChange={(e) => {
                  setSupportVal({
                    ...supportVal,
                    last_name: e.target.value,
                  });
                }}
              />
              <InputText
                label={""}
                placeholder={"mark@work-email.com"}
                name={"workemail"}
                id={"workemail"}
                value={supportVal.email}
                onChange={(e) => {
                  setSupportVal({
                    ...supportVal,
                    email: e.target.value,
                  });
                }}
              />

              <textarea
                placeholder="Comments"
                value={supportVal.comment}
                onChange={(e) => {
                  setSupportVal({
                    ...supportVal,
                    comment: e.target.value,
                  });
                }}
              />

              <InputButton
                name={"Send message"}
                onClick={() => {
                  handleSubmit({
                    name: `${supportVal.first_name} ${supportVal.last_name}`,
                    comment: supportVal.comment,
                    email: supportVal.email,
                  });
                }}
              />
              {showSuccessful && (
                <WaitListModal
                  heading={"Doow"}
                  content={`Someone will get in touch with you shortly.`}
                  onClose={() => setshowSuccessful(false)}
                  name={supportVal.first_name}
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
