import React from 'react';
import { Link } from 'react-router-dom';
import transparentLogo from "../images/transparentLogo.png";
function Logo() {
    return (
        <Link to="/">

            <img src={transparentLogo} alt="Logo"
                 style={{
                     cursor: 'pointer',
                     width: '300px',
                     height: 'auto'
                 }}/>
        </Link>
    );
}

export default Logo;