import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";

const httpLink = new HttpLink({
  uri: "https://api.spacex.land/graphql",
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            const oldheaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldheaders,
                autherization: "token bx",
              },
            });
            break;

          case "GRAPHQL_VALIDATION_FAILED":
            console.log("validation failed error occured ", operation);
            return forward(operation);
        }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }
    }
  }
);

const networkRetryLink = new RetryLink();

export const client = new ApolloClient({
  link: from([errorLink, networkRetryLink, httpLink]),
  cache: new InMemoryCache(),
});
