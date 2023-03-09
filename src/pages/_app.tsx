import { type AppType } from "next/app";
import { AccountCreationProvider } from "../context";
import "../styles/index.scss";
import { ApolloProvider } from "@apollo/client";
import graphqlClient from "../graphql/apollo";
import Layout from "../comps/global/Layout";
import { MenuContextProvider } from "../context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../context/auth";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <>
      <ApolloProvider client={graphqlClient}>
        <AuthProvider>
          <MenuContextProvider>
            <AccountCreationProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AccountCreationProvider>
          </MenuContextProvider>
        </AuthProvider>
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
