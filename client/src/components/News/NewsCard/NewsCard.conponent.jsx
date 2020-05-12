import React, {useEffect, useState} from 'react';
import classes from './styles.module.scss'
import {Link} from "react-router-dom";
import baseUrl from "../../../baseurl";
import {categoryParser} from "../../../helpers/newsDataParder";
import {dateParser} from "../../../helpers/dateParser";

const host = baseUrl()

const NewsCard = props => {
    const [image, setImage] = useState('')

    useEffect(() => {
        if (props.post.image)
            setImage(`${JSON.parse(props.post.image)}`)
    }, [props])

    return (
        <Link to={`/news/${props.post.id}`}>
            <div className={classes.Card}>
                {image &&
                <div className={classes.Image} style={{backgroundImage: `url(${host}/images/${image})`}}>&nbsp;</div>}
                <div className={classes.Content}>
                    <h3 className={classes.Title}>{props.post.title}</h3>
                    <p className={classes.Description}>{props.post.description}</p>
                    <p className={classes.Category}>{categoryParser(props.post.category)}</p>
                    <p className={classes.Data}>{dateParser(props.post.createdAt)}</p>
                    <p className={classes.Count}>Просмотров: {props.post.count}</p>
                </div>
            </div>
        </Link>
    );
}

export default NewsCard;
