import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';


//Here we are creating multiple urls for each of pages

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link="/blog">Blog</NavigationItem>
        <NavigationItem link="/">Home</NavigationItem>
    </ul>
);

export default navigationItems;