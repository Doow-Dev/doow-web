import React from "react";
import MetaHeader from "../src/comps/global/Header";
import { LoginView } from "../src/views/login/login.view";

export default function LoginPage() {
  return (
    <>
      <MetaHeader title={"Login | Doow"} />
      <LoginView />;
    </>
  );
}
