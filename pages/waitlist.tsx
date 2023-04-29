import React from "react";
import MetaHeader from "../src/comps/global/Header";
import { WaitList } from "../src/views/waitlist/waitlist.view";

export default function HomePage() {
  return (
    <>
      <MetaHeader title={"Get early access | Doow"} />
      <WaitList />
    </>
  );
}
