import React, {useState, useEffect} from 'react';
import {gql, useLazyQuery} from '@apollo/client';

//Style
import '../Style.css';


//Search query
const GET_CHAR_SEARCH = gql`
	query CharSearch($searchQ: String!, $page: Int!, $status: String!) {
        characters(page: $page, filter: {name: $searchQ, status: $status}) {
            results {
                id
                image
                name
                status
                species
                type
                gender
                location {
                    name
                    dimension
                }
            }
            info {
                pages
                next
                prev
                count
            }
        }
    }
`;

//Login JSX
const Search = props => {
    //Queries
    const searchChars = useLazyQuery(GET_CHAR_SEARCH,  {
        fetchPolicy: "network",
        onCompleted: (data) => searchCompleted(data.characters),
        onError: (error) => searchFailed(error)
    });

    //Hooks for managing the state of the typed text
    const [typedSearch, setTypedSearch] = useState("");
    const [status, setStatus] = useState("");

    //Handler to call the Query
    const submitHandler = (event) => {
        //Prevent page change
        event.preventDefault();

        //Lazy request the query
        searchChars[0]({variables: {page: 1, searchQ: typedSearch, status}});

        //Prevent page change
        return false;
    }

    //On Start make a simple search with no parameters
    useEffect(() => {
        searchChars[0]({variables: {page: 1, searchQ: "", status: ""}});
        //eslint-disable-next-line
    }, []);


    //Search Result Complete
    const searchCompleted = (queryResult) => {
        props.updateResponse(queryResult, {page: 1, searchQ: typedSearch, status: status});
    };
    
    //Search Failed
    const searchFailed = (error) => {
        alert("ERROR");
        props.updateResponse(null);
    };

    //Return
    return (
        <div className="Search">
            <form className="SearchForm" onSubmit={(event) => submitHandler(event)}>
                <label style={{marginRight: "10px"}}><b>Search:</b></label>
                <input
                    className="SearchInput"
                    type="text"
                    placeholder="Char name"
                    value={typedSearch}
                    onChange={(e) => setTypedSearch(e.target.value)}/>
                <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Any</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                </select>
                <button className="SearchButton clickable" type="submit">Submit</button>
                <input type="submit" hidden/>
            </form>
        </div>
    );
}



export default Search;