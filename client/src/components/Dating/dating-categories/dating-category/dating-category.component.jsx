import React from 'react';
import classes from './styles.module.scss'
import {Link} from "react-router-dom";

const DatingCategoriy = props => {
    return (
        <Link to={`/dating/${props.id}`} className={classes.Card}>
            <div className={classes.Image}>&nbsp;</div>
            <h4 className={classes.Title}>{props.title}</h4>
        </Link>
    );
};

export default DatingCategoriy;
