import React, {useEffect} from "react";
import {fetchAll} from "../../redux/thunks/rent-ad.thunks";
import {connect} from "react-redux";
import Loader from "../Loader/Loader";
import FilterableProductTable from './search-filter/filterable-product-table.component';

const Filter = props => {

    useEffect(() => {
        props.fetchAlldispatch()
        // eslint-disable-next-line
    }, [])

    const uniqItems = (x, i, array) => array.indexOf(x) === i;
    const PRODUCT_CATEGORIES = props.rentAds.map(prod => prod.typeOfApplicant).filter(uniqItems);
    const SIZE_CATEGORIES = props.rentAds.map(prod => prod.typeOfObject).filter(uniqItems);
    const CITIES_CATEGORIES = props.rentAds.map(prod => prod.city).filter(uniqItems);
    PRODUCT_CATEGORIES.unshift("all");
    CITIES_CATEGORIES.unshift("all");
    SIZE_CATEGORIES.unshift("all");

    return (
        props.loaded
            ? <FilterableProductTable
                cityCategories={CITIES_CATEGORIES}
                productCategories={PRODUCT_CATEGORIES}
                sizeCategories={SIZE_CATEGORIES}
                rentAds={props.rentAds}
                limit={props.limit}
                hasMore={props.hasMore}
            />
            : <Loader/>
    );
}

const mapState = state => ({
    rentAds: state.rent.ads,
    limit: state.rent.limit,
    hasMore: state.rent.hasMore,
    loaded: state.rent.loaded
})

const mapDispatch = dispatch => ({
    fetchAlldispatch: () => dispatch(fetchAll())
})

export default connect(mapState, mapDispatch)(Filter);