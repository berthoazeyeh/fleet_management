// import {
//   concat,
//   HttpLink,
//   ApolloLink,
//   ApolloClient,
//   InMemoryCache,
// } from '@apollo/client';
// import { retrieveSavedToken } from 'utils';


// // const GRAPHQL_URL = 'https://api.dev.africtrack.com/'; // DEV
// //const GRAPHQL_URL = 'https://api.africtrack.com/graphql'; // UAT
// const GRAPHQL_URL = 'https://api.lewootrack.com/graphql'; // UAT
// // const GRAPHQL_URL = 'https://api.eneotransportation.com'; // PROD

// const cache = new InMemoryCache();

// const httpLink = new HttpLink({ uri: GRAPHQL_URL });

// const authLink = new ApolloLink(async (operation, forward) => {
//   let token = await retrieveSavedToken();
//   // console.log("token-------apollo---client", token);
//   operation.setContext({
//     headers: {
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   });
//   return forward(operation);
// });

// const link = concat(authLink, httpLink);

// const clients = new ApolloClient({
//   link: link,
//   cache: cache,
// });

// export const client = clients;




import {
  HttpLink,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  split,
} from '@apollo/client';
import { retrieveSavedToken } from 'utils';
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";


const httpLink = new HttpLink({
  uri: "https://api.lewootrack.com", // UAT
});

const wsLink = new WebSocketLink({
  uri: "wss://api.lewootrack.com", // UAT

  options: {
    reconnect: true,
    lazy: true,
    connectionParams: async () => ({
      Authorization: `Bearer ${await retrieveSavedToken()}`,
    }),
  },
});

const cache = new InMemoryCache();

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await retrieveSavedToken();
  // return the headers to the context so httpLink can read them
  /* eslint-disable indent */
  return token
    ? {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }
    : {
      headers: { ...headers },
    };
  /* eslint-enable indent */
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const clients = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: cache,
});
export const client = clients;
// export default client;