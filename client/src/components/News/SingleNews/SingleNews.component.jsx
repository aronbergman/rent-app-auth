import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {fetchSinglePost} from "../../../redux/thunks/news.thunks";
import Loader from "../../Loader/Loader";
import DefaultLayout from "../../Layouts/default.layout";
import classes from './styles.module.scss'
import {dateParser} from "../../../helpers/dateParser";
import {categoryParser} from "../../../helpers/newsDataParder";
import baseUrl from "../../../baseurl";
import ReactDisqusComments from 'react-disqus-comments';

const host = baseUrl()

const SingleNews = props => {
    const [post, setPost] = useState([])
    const [image, setImage] = useState('')

    useEffect(() => {
        props.fetchSinglePost(props.match.params.id).then(res => {
            setPost(res)
            setImage(`${JSON.parse(res.image)}`)
        })
    }, [])

    return (
        post ? <DefaultLayout>
                        <div className={classes.PostContent}>
                            <h1 className="">{post.title}</h1>
                            <div
                            className={classes.Image}
                            style={{backgroundImage: `url(${host}/images/${image})`}}
                            >&nbsp;</div>
                            {categoryParser(post.category)}
                                {post.content}
                            {dateParser(post.createdAt)}

                            </div>
            </DefaultLayout> :
            <Loader/>
    )
        ;
};

const mapDispatch = dispatch => ({
    fetchSinglePost: id => dispatch(fetchSinglePost({id}))
})

export default connect(null, mapDispatch)(SingleNews);
