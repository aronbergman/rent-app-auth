import React from "react";
import AdCardComponent from "../../ad-card/ad-card.component";
import classes from './styles.module.scss'
import dateParser from "../../../../helpers/dateParser";
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from "react-redux";
import {handlerFetchOffsetRentAd} from "../../../../redux/thunks/rent-ad.thunks";
import Loader from "../../../Loader/Loader";

const ProductTable = props => {
    const rows = [];
    const filterText = props.filterText;
    const inStockOnly = props.inStockOnly;
    const filterCategory = props.filterCategory;
    const filterCity = props.filterCity;
    const filterSize = props.filterSize;

    props.rentAds.forEach(product => {
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
            limit: 10,
            offset: pages
        })
    }

    return (
        <div className={classes.Container}>
            <div className={classes.SearchLength}> Страница обновлена: {dateParser(Date.now())}</div>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadFunc}
                hasMore={true}
                loader={<Loader/>}>
                {rows}
            </InfiniteScroll>
        </div>
    );
};

const mapDispatch = dispatch => ({
    fetchOffset: e => dispatch(handlerFetchOffsetRentAd(e))
})

export default connect(null, mapDispatch)(ProductTable);