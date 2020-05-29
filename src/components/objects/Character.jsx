import React, { useState } from 'react';

//Style
import '../Style.css';

//Components
import Planet from './Planet'

const Character = props => {
    //Props
    const {
        data,
    } = props;

    //Hooks
    const [locationShown, setLocationShown] = useState(false);

    //Return
    return (
        <div className="Character">
            <img className="CharacterImg" src={data.image} alt=""/>
            <div className="CharacterContent">
                <h3>{data.name}</h3>
                <p className="shortP"><b>Status:</b> {data.status}</p>
                <p className="shortP"><b>Species:</b> {data.species}</p>
                <p className="shortP"><b>Type:</b> {data.type ? data.type : "None"}</p>
                <p className="shortP"><b>Gender:</b> {data.gender}</p>
                <button className="CharacterPlanetButton clickable"
                        onClick={() => setLocationShown(!locationShown)}>
                            <b>{locationShown ? "Hide Planet" : "Show Planet"}</b>
                </button>
                {locationShown ? 
                    <Planet data={data.location} />
                : null}
            </div>
        </div>
    );
}



export default Character;