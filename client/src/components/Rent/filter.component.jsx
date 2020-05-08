import React, {useEffect} from "react";
import {fetchAll} from "../../redux/thunks/rent-ad.thunks";
import {connect} from "react-redux";
import Loader from "../Loader/Loader";
import FilterableProductTable from './search-filter/filterable-product-table.component';
import {Button} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {Link} from "react-router-dom";

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
            />
            : <Loader/>
    );
}

const mapState = state => ({
    rentAds: state.rent.ads,
    loaded: state.rent.loaded
})

const mapDispatch = dispatch => ({
    fetchAlldispatch: () => dispatch(fetchAll())
})

export default connect(mapState, mapDispatch)(Filter);