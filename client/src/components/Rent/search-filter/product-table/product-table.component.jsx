import React from "react";
import AdCardComponent from "../../ad-card/ad-card.component";
import classes from './styles.module.scss'
import dateParser from "../../../../helpers/dateParser";
import InfiniteScroll from 'react-infinite-scroller';

const ProductTable = props => {
    const rows = [];
    const filterText = props.filterText;
    const inStockOnly = props.inStockOnly;
    const filterCategory = props.filterCategory;
    const filterCity = props.filterCity;
    const filterSize = props.filterSize;

    const ads = [...props.rentAds].sort((a, b) => a.id < b.id ? 1 : -1);

    ads.forEach(product => {
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

    const loadFunc = () => {
        console.log('loadFunc')
    }

    return (
        <div>
            <div className={classes.SearchLength}> Страница обновлена: {dateParser(Date.now())}</div>
            {/* eslint-disable-next-line react/jsx-no-undef */}
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadFunc}
                    hasMore={true}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    {rows}
                </InfiniteScroll>
        </div>
    );
};

const mapDispatch = dispatch => ({
    fetchOffset: e  => dispatch(handlerFetchOffsetRentAd(e))
})

export default connect(null, mapDispatch)(ProductTable);