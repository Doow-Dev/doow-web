import React from "react";
import MetaHeader from "../../src/comps/global/Header";
import PrivacyPolicyView from "../../src/views/terms/privacy.view";

export default function LoginPage() {
  return (
    <>
      <MetaHeader title={"Privacy Policy"} />
      <PrivacyPolicyView />
    </>
  );
}
