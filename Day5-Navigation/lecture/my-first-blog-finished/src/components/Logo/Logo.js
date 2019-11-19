import React from 'react';
import { NavLink } from 'react-router-dom';

import myLogo from '../../assets/images/my-logo.png';
import './Logo.css';
// Here is how we add images to the JS file

const logo = (props) => (
    <NavLink
        to={props.link}>
        <div className="Logo">
            <img src={myLogo} alt="Logo"/>
        </div>
    </NavLink>
);

export default logo;