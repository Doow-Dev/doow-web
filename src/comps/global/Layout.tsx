import Head from "next/head";
import NavBar from "../navbar/navbar.comp";
import { SideBar } from "../sidebar/sidebar";
import MetaHeader from "./Header";

export default function Layout(props) {
  return (
    <>
      <MetaHeader title={"Welcome to doow"} />
      {/* <NavBar /> */}
      {/* <SideBar /> */}
      {props.children}
    </>
  );
}
