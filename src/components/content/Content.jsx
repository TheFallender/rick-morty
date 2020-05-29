import React, { useState, useEffect } from 'react';

//Style
import '../Style.css';
import Footer from './Footer';
import Character from '../objects/Character';

//Components

const Content = props => {
    //Props
    const {
        data,
        queryParam,
        updateResponse,
    } = props;

    //Hooks
    const [charactersList, setCharactersList] = useState(null);

    useEffect(() => {
        setCharactersList(data.results.map((element) =>
            <Character key={"Character" + element.id} data={element}/>
        ));
    }, [data])

    //Return
    return (
        <div className="Content">
            <div className="Chars">
                {charactersList ? charactersList : null}
            </div>
            <Footer data={data.info} params={queryParam} updateResponse={updateResponse}/>
        </div>
    );
}



export default Content;