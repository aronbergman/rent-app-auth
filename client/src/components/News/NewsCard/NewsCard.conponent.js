import React from 'react';
import classes from './styles.module.scss'

const NewsCard = props => {
    return (
        <div className={classes.Card}>
            <h3>{props.title}</h3>
        </div>
    );
};

export default NewsCard;
