import React from "react";
import MetaHeader from "../../src/comps/global/Header";
import { ContactUsView } from "../../src/views/contact/contactUs.view";

export default function ContactUs() {
  return (
    <>
      <MetaHeader title={"Contact us | Doow"} />
      <ContactUsView />
    </>
  );
}
