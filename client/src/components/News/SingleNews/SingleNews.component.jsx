import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {fetchSinglePost} from "../../../redux/thunks/news.thunks";
import Loader from "../../Loader/Loader";
import DefaultLayout from "../../Layouts/default.layout";

const SingleNews = props => {
    const [post, setPost] = useState([])

    useEffect(() => {
        props.fetchSinglePost(props.match.params.id).then(res => {
            setPost(res)
        })
    },[])

    return (
        post ? <DefaultLayout>
            <h2>{post.title}</h2>
            <h2>{post.content}</h2>
            <h2>{post.category}</h2>
            <h2>{post.image}</h2>
        </DefaultLayout> : <Loader/>
    );
};

const mapDispatch = dispatch => ({
    fetchSinglePost: id => dispatch(fetchSinglePost({id}))
})

export default connect(null, mapDispatch)(SingleNews);
