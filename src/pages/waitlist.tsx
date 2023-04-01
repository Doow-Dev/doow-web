import Head from "next/head";
import React from "react";
import { WaitList } from "../views/waitlist/waitlist.view";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Waitlist </title>
        <meta name="doow" content="Created by Hexelan" />
        <link rel="icon" href="/images/Doow.png" />
      </Head>
      <WaitList />
    </>
  );
}
