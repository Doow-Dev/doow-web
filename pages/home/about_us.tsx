import React from "react";
import MetaHeader from "../../src/comps/global/Header";
import AboutUsView from "../../src/views/terms/about.view";

export default function HomePage() {
  return (
    <>
      <MetaHeader title={"About us | Doow"} />
      <AboutUsView />
    </>
  );
}
