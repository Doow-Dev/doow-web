import { type AppType } from "next/app";
import "../styles/index.scss";
import { ApolloProvider } from "@apollo/client";
import Layout from "../comps/global/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apolloClient from "../constants/apollo-client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux/store";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <>
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
