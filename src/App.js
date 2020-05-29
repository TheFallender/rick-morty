import React, {useState} from 'react';
import {ApolloProvider} from '@apollo/client';
import {client} from './apis/apolloClient';

//Components
import Header from './components/header/Header';
import Content from './components/content/Content';

//App.css
import './App.css';
import './components/Style.css'

function App() {
	//Hook for the data loaded
	const [response, setResponse] = useState(null);
	const [param, setParam] = useState(null);

	const updateResponse = (resp, queryParam) => {
		setParam(queryParam);
		setResponse(resp);
	}

	//Return the data
	return (
		<ApolloProvider client={client}>
			<Header siteName={"Rick&Morty"} updateResponse={updateResponse}/>
			{response ?
				<Content data={response} queryParam={param} updateResponse={updateResponse}/>
				:
				null
			}
		</ApolloProvider>
	);
}

export default App;
