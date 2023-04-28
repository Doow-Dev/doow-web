import React from "react";
import MetaHeader from "../comps/global/Header";
import TermsOfServicesView from "../views/terms/terms.view";

export default function LoginPage() {
  return (
    <>
      <MetaHeader title={"Terms of use"} />
      <TermsOfServicesView />
    </>
  );
}
