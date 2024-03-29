import React from 'react';
import Loader from "../../components/Loader/Loader";
import InfiniteScroll from "react-infinite-scroller";
import NewsCard from "../../components/News/NewsCard/NewsCard.conponent";
import { handlerNewsOffset } from "../../redux/thunks/news.thunks";
import { connect } from "react-redux";

const CardsContainer = props => {
    console.log(props)
    const rows = [];

    props.news.forEach(post => {
        rows.push(<NewsCard key={post.id} post={post}/>)
    })

    const loadFunc = pages => {
        props.fetchOffset({
            limit: props.limit,
            offset: pages
        })
    }

    return (
        <div>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadFunc}
                hasMore={props.hasMore}
                loader={props.news >= 10 ? <Loader key={0}/> : null}>
                {rows}
            </InfiniteScroll>
        </div>
    );
};

const mapDispatch = dispatch => ({
    fetchOffset: data => dispatch(handlerNewsOffset(data))
})

export default connect(null, mapDispatch)(CardsContainer);
