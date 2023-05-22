import { type AppType } from "next/app";
import "../src/styles/index.scss";
import { ApolloProvider } from "@apollo/client";
import Layout from "../src/comps/global/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import apolloClient from "../src/graphql/apollo-client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../src/redux/store";
// import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
{
  /* <GoogleAnalytics 
      // gaMeasurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
      // trackPageViews
      />
      */
}
// usePageViews();
const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <ReduxProvider store={store}>
          <Layout>
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </ReduxProvider>
      </ApolloProvider>
      <ToastContainer
        closeButton={false}
        hideProgressBar={true}
        autoClose={1500}
      />
    </>
  );
};

export default MyApp;
