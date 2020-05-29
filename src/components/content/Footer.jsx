import React, { useState } from 'react';
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

const Footer = props => {
    //Props
    const {
        data,
        params,
        updateResponse
    } = props;

    //Hook
    const [pageSelected, setPageSelected] = useState(0);

    //Queries
    const searchChars = useLazyQuery(GET_CHAR_SEARCH,  {
        fetchPolicy: "network",
        onCompleted: (data) => searchCompleted(data.characters),
    });

    //Go to the selected page
    const selectedPage = (pageNum) => {
            searchChars[0]({variables: {page: pageNum, searchQ: params.searchQ, status: params.status}});
            setPageSelected(pageNum);
    };

    const searchCompleted = (result) => {
        updateResponse(result, {page: pageSelected, searchQ: params.searchQ, status: params.status});
    }

    //Return
    return (
        <div className="Footer">
            {data.prev ? 
                <button className="shortH3 clickable" onClick={() => selectedPage(data.prev)}>
                    {data.prev}
                </button>
            : <h3 className="shortH3">No prev</h3>}
            <h3 className="shortH3"> {" <"}-- {params.page}/{data.pages} --{"> "} </h3>
            {data.next ?
                <button className="shortH3 clickable" onClick={() => selectedPage(data.next)}>
                    {data.next}
                </button>
            : <h3 className="shortH3">No next</h3>}
        </div>
    );
}



export default Footer;