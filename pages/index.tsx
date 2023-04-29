import React from "react";
import MetaHeader from "../src/comps/global/Header";
import HomeView from "../src/views/home/home.view";

export default function HomePage() {
  return (
    <>
      <MetaHeader title={"Doow | Africa's #1 Business Bank for Startups"} />
      <HomeView />
    </>
  );
}
