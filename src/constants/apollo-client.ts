import {
    ApolloClient, InMemoryCache,
    createHttpLink
  } from "@apollo/client";
  import { setContext } from "@apollo/client/link/context";
  import { API_URL } from "./uris";
  
  const httpLink = createHttpLink({
    uri: `${API_URL}/graphql`,
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("@accessToken");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
  
  export default apolloClient;
  