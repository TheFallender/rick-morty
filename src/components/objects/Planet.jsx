import React from 'react';

//Style
import '../Style.css';

const Planet = props => {
    //Props
    const {
        data,
    } = props;

    //Return
    return (
        <div className="Planet">
            <p className="shortP"><b>Planet name:</b> {data.name}</p>
            <p className="shortP"><b>Dimension:</b> {data.dimension}</p>
        </div>
    );
}



export default Planet;