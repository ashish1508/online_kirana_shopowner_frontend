import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem click={props.clicked} link="/cart" active>Burger Builder</NavigationItem>
        <NavigationItem click={props.clicked} link="/order">Checkout</NavigationItem>
        <NavigationItem click={props.clicked} link="/cat">Categories</NavigationItem>
    </ul>
);

export default navigationItems;