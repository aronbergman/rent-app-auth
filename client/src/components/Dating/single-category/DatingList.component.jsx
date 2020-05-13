import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {handlerFetchOffsetDatingAd, handlerSingleCategoryLoad} from "../../../redux/thunks/dating.thunks";
import Loader from "../../Loader/Loader";
import DefaultLayout from "../../Layouts/default.layout";
import classes from "./styles.module.scss";
import {Link} from "react-router-dom";
import {Button, message} from "antd";
import {dateParser} from "../../../helpers/dateParser";
import InfiniteScroll from "react-infinite-scroller";
import AdCardComponent from "../../Dating/single-category/ad-card.component";

const DatingList = props => {

    useEffect(() => {
        props.fetchSingleCategory(props.match.params.id)
    }, [])

    const rows = []

    if (props.loaded) {
        props.ads.map(product => {
            rows.push(<AdCardComponent ad={product} key={product.id}/>);
        })
    }

    const loadFunc = pages => {
        props.fetchOffset({
            limit: props.limit,
            offset: pages,
            category: props.match.params.id
        })
    }

    let dateLoadingData = Date.now()

    const reloadingHandler = () => {
        props.fetchSingleCategory(props.match.params.id).then(() => {
            message.info('Список обновлен');
            dateLoadingData = Date.now()
        })
    }

    return (
        props.loaded ? <DefaultLayout>
            <div className={classes.CreateAd}>
                <h3>Категория {props.title}</h3>
                <Link to={{
                    pathname: '/dating/create',
                    state: {
                        category: {
                            id: props.match.params.id,
                            name: props.title
                        }
                    }
                }}>
                    <Button type="primary" shape="round" size='large'>
                        Создать объявление
                    </Button>
                </Link>
            </div>

            <div className={classes.Container}>
                <div className={classes.SearchLength}> Страница обновлена: {dateParser(dateLoadingData)} <a
                    onClick={reloadingHandler} href="#">Обновить</a></div>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadFunc}
                    hasMore={props.hasMore}
                    loader={<Loader key={0}/>}>
                    {rows}
                </InfiniteScroll>
            </div>

        </DefaultLayout> : <Loader/>
    );
};

const mapState = state => ({
    title: state.dating.singleCategory.title,
    ads: state.dating.singleCategory.ads,
    loaded: state.app.loaded,
    hasMore: state.dating.hasMore,
    limit: state.dating.limit
})

const mapDispatch = dispatch => ({
    fetchOffset: e => dispatch(handlerFetchOffsetDatingAd(e)),
    fetchSingleCategory: id => dispatch(handlerSingleCategoryLoad({id}))
})

export default connect(mapState, mapDispatch)(DatingList);
