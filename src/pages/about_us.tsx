import React from "react";
import MetaHeader from "../comps/global/Header";
import AboutUsView from "../views/terms-privacy/about.view";

export default function HomePage() {
  return (
    <>
      <MetaHeader title={"About us | Doow"} />
      <AboutUsView />
    </>
  );
}
