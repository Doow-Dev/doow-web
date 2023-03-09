import Head from "next/head";

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>DOOW </title>
        <meta name="doow" content="Created by Hexelan" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      {props.children}
    </>
  );
}
