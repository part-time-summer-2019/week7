import React from 'react';

import './ToolBar.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems';


const toolbar = (props) => (
    <header className="Toolbar">
        <div className="Logo">
            <Logo link="/" />
        </div>
        <NavigationItems />
    </header>
);

export default toolbar;