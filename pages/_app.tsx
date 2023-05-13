import { type AppType } from "next/app";
import "../src/styles/index.scss";
import { ApolloProvider } from "@apollo/client";
import Layout from "../src/comps/global/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apolloClient from "../src/graphql/apollo-client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../src/redux/store";
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  usePageViews();
  return (
    <>
      <GoogleAnalytics
      // gaMeasurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
      // trackPageViews
      />
      <ApolloProvider client={apolloClient}>
        <ReduxProvider store={store}>
          <Layout>
            <Component {...pageProps} />
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
