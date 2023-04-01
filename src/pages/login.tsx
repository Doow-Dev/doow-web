import React from "react";
import MetaHeader from "../comps/global/Header";
import { LoginView } from "../views/login/login.view";

export default function LoginPage() {
  return (
    <>
      <MetaHeader title={"Login | Doow"} />
      <LoginView />;
    </>
  );
}
