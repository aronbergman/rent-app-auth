import React, {useEffect} from 'react';
import Header from "./../Header/Header.component";
import classes from './styles.module.scss'
import {connect} from "react-redux";
import {handlerNews} from "../../redux/thunks/news.thunks";
import CardsContainer from "./CardsContainer/CardsContainer.component";
import Loader from "../Loader/Loader";
import DefaultLayout from "../Layouts/default.layout";

const News = props => {

    useEffect(() => {
        props.fetchNews();
    }, []);

    return (
        <div>
            <Header>
                <h2>Новости</h2>
            </Header>

            {props.news ? <DefaultLayout>
                <div className={classes.News}>
                    <CardsContainer
                        hasMore={props.hasMore}
                        limit={props.limit}
                        news={props.news}/>
                </div>
            </DefaultLayout> : <Loader/>}
        </div>
    );
};

const mapState = state => ({
    news: state.news.news,
    limit: state.news.limit,
    hasMore: state.news.hasMore
})

const mapDispatch = dispatch => ({
    fetchNews: () => dispatch(handlerNews())
})

export default connect(mapState, mapDispatch)(News);
