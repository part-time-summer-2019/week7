import React from 'react';
import { NavLink } from 'react-router-dom'; 

import './NavigationItem.css';

// Here we set the link to props children to display the specific navigation path dynamically
const navigationItem = (props) => (
    <li className="NavigationItem">
        <NavLink 
            to={props.link}
            activeClassName="active">{props.children}</NavLink>
    </li>
);

export default navigationItem;