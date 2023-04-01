import React from "react";
import MetaHeader from "../comps/global/Header";
import { ContactUsView } from "../views/contact/contactUs.view";

export default function ContactUs() {
  return (
    <>
      <MetaHeader title={"Contact us | Doow"} />
      <ContactUsView />
    </>
  );
}
