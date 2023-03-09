import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { createContext } from "react";

// uri: "https://eims.up.railway.app/graphql",
const graphqlClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL,
  cache: new InMemoryCache(),
});

export default graphqlClient;
