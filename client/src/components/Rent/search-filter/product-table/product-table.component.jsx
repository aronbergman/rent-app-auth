import React, {useEffect} from "react";
import AdCardComponent from "../../ad-card/ad-card.component";
import classes from './styles.module.scss'
import {dateParser} from "../../../../helpers/dateParser";
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from "react-redux";
import {
    fetchAll,
    handlerFetchOffsetRentAd,
    handlerFetchSocketRentAd
} from "../../../../redux/thunks/rent-ad.thunks";
import Loader from "../../../Loader/Loader";
import {message} from "antd";

import io from "socket.io-client";
import baseUrl from "../../../../baseurl";
let socket;


const ProductTable = props => {
    const rows = [];
    const filterText = props.filterText;
    const inStockOnly = props.inStockOnly;
    const filterCategory = props.filterCategory;
    const filterCity = props.filterCity;
    const filterSize = props.filterSize;

    const ENDPOINT = baseUrl()
    socket = io(ENDPOINT);

    useEffect(() => {
        socket.on('fetchRentAd', ad => {
            props.fetchSocketData(ad)
            message.info(`Новое объявление: ${ad.title}`);
        });
    }, [])

    props.rentAds.forEach(product => {
        console.log('product', product)
        const name = product.title.toLowerCase();
        if (name.indexOf(filterText.toLowerCase())) {
            return;
        }
        if (filterCategory !== product.typeOfApplicant && filterCategory !== 'all') {
            return;
        }
        if (filterCity !== product.city && filterCity !== 'all') {
            return;
        }
        if (filterSize !== product.typeOfObject && filterSize !== 'all') {
            return;
        }
        if (inStockOnly && product.userId === 0) {
            return;
        }
        rows.push(<AdCardComponent ad={product} key={product.id}/>);
    });

    const loadFunc = pages => {
        props.fetchOffset({
            limit: props.limit,
            offset: pages
        })
    }

    let dateLoadingData = Date.now()

    const reloadingHandler = () => {
        props.fetchAll().then(() => {
            message.info('Список обновлен');
            dateLoadingData = Date.now()
        })
    }

    return (
        <div className={classes.Container}>
            <div className={classes.SearchLength}> Страница обновлена: {dateParser(dateLoadingData)} <a onClick={reloadingHandler} href="#">Обновить</a></div>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadFunc}
                hasMore={props.hasMore}
                loader={<Loader key={0} />}>
                {rows}
            </InfiniteScroll>
        </div>
    );
};

const mapDispatch = dispatch => ({
    fetchOffset: e => dispatch(handlerFetchOffsetRentAd(e)),
    fetchSocketData: ad => dispatch(handlerFetchSocketRentAd({ad})),
    fetchAll: () => dispatch(fetchAll())
})

export default connect(null, mapDispatch)(ProductTable);