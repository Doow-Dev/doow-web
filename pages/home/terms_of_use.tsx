import React from "react";
import MetaHeader from "../../src/comps/global/Header";
import TermsOfServicesView from "../../src/views/terms/terms.view";

export default function LoginPage() {
  return (
    <>
      <MetaHeader title={"Terms of use"} />
      <TermsOfServicesView />
    </>
  );
}
