import React from "react";
import MetaHeader from "../src/comps/global/Header";
import HomeView from "../src/views/home/home.view";

export default function HomePage() {
  return (
    <>
      <MetaHeader title={"Doow | All in one spend management for Businesses"} />
      <HomeView />
    </>
  );
}
