import React from 'react';

//Components
import Search from './Search';

//Style
import '../Style.css';

//Media
import logo from '../../media/logo.png'
import git from '../../media/github.png'


//Header
const Header = props => {
    //Props
    const {
        siteName,
        updateResponse,
    } = props;

    //Return
    return (
        <div className="Header">
            <div className="HeaderBack">
                <a href="." className="HeaderBanner noDec">
                    <img className="HeaderLogo" src={logo} alt={"logo-pic"}/>
                    <h1 className="HeaderText"onClick={(e) => updateResponse(null)}>{siteName}</h1>
                </a>
                <a className="HeaderGithub" href="https://github.com/TheFallender" style={{height: "100%"}}>
                    <img className="HeaderLogo" src={git} alt={"git-pic"}/>
                </a>
            </div>
            <div className="HeaderMenu">
                <Search updateResponse={updateResponse}/>
            </div>
        </div>
    );
}

export default Header;