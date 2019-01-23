import * as React from 'react';

import NavigationItem from '../NavigationItem/NavigationItem';
import styles from '../NavigationItems/NavigationItems.module.scss';


const navigationItems = () => (
    <ul className={styles.NavigationItems}>
        <NavigationItem url='/' exact>Home</NavigationItem>
        <NavigationItem url='/about' >About</NavigationItem>
        <NavigationItem url='/members' >Members</NavigationItem>
    </ul>
);

export default navigationItems;