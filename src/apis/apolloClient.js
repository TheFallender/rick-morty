import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';

//HTTP Link
const httpLink = createHttpLink({
    uri: 'https://rickandmortyapi.com/graphql/',
});

//Set the token on the authorization
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
        }
    }
});

const client = new ApolloClient({
  	cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
	onError: ({ networkError, graphQLErrors }) => {
		console.log('graphQLErrors', graphQLErrors)
		console.log('networkError', networkError)
	}
});

export {client, authLink};