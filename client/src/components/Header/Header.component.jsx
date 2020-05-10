import React from 'react';
import classes from './styles.module.scss'

const Header = props => {
    return (
        <div className={classes.Header}>
            {props.children}
        </div>
    );
};

export default Header;
