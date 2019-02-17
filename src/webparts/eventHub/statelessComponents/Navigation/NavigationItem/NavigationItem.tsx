import * as React from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../NavigationItem/NavigationItem.module.scss';

export interface NavigationItemProps {
    url: string;
    exact?: boolean;
    children: React.ReactNode;
}

const navigationItem = (props:NavigationItemProps) => (
    <li className={styles.NavigationItem}>
        <NavLink 
            to={props.url}
            exact={props.exact}
            >{props.children}</NavLink>
        
    </li> 
);

export default navigationItem;