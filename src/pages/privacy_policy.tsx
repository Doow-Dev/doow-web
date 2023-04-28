import React from "react";
import MetaHeader from "../comps/global/Header";
import PrivacyPolicyView from "../views/terms/privacy.view";

export default function LoginPage() {
  return (
    <>
      <MetaHeader title={"Privacy Policy"} />
      <PrivacyPolicyView />
    </>
  );
}
