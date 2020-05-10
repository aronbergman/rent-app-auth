import React from 'react';
import classes from './styles.module.scss'
import {Link} from "react-router-dom";

const NewsCard = props => {
    return (
        <Link to={`/news/${props.post.id}`}>
            <div className={classes.Card}>
                <h3>{props.post.title}</h3>
            </div>
        </Link>
    );
};

export default NewsCard;
