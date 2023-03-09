import Head from "next/head";
import NavBar from "../navbar/navbar.comp";
import { SideBar } from "../sidebar/sidebar";

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>DOOW </title>
        <meta name="doow" content="Created by Hexelan" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <NavBar />
      {/* <SideBar /> */}
      {props.children}
    </>
  );
}
