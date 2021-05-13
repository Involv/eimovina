import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  ApolloLink,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import AwsSyncConfig from "./aws/aws-export";
import { LocalStorageKeys } from "./modules/authentification/enums/local-storage-keysenum.";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: AwsSyncConfig.aws_appsync_graphqlEndpoint,
});

const authMiddleware = new ApolloLink((operation: any, forward: any) => {
  const accessToken = localStorage.getItem(
    LocalStorageKeys.eimovinaAccessToken
  );
  operation.setContext({
    headers: {
      "x-api-key": !accessToken ? AwsSyncConfig.aws_appsync_apiKey : "",
      authorization: accessToken || "",
    },
  });

  return forward(operation);
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    console.log({ graphQLErrors });
    console.log({ networkError });
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
    return forward(operation);
  }
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, authMiddleware, httpLink]),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
