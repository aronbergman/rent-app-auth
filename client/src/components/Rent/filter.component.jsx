import React, {useEffect} from "react";
import {fetchAll} from "../../redux/thunks/rent-ad.thunks";
import {connect} from "react-redux";
import Loader from "../Loader/Loader";
import AdCardComponent from "./ad-card/ad-card.component";
import FilterableProductTable from './search-filter/filterable-product-table.component';

const Filter = props => {

    useEffect(() => {
        props.fetchAlldispatch()
        // eslint-disable-next-line
    }, [])

    const PRODUCTS = [
        {
            city: 78,
            category: "Sporting Goods",
            price: "$49.99",
            stocked: true,
            name: "Football"
        },
        {
            city: 78,
            category: "Sporting Goods",
            price: "$9.99",
            stocked: true,
            name: "Baseball"
        },
        {
            city: 78,
            category: "Sporting Goods",
            price: "$29.99",
            stocked: false,
            name: "Basketball"
        },
        {
            city: 77,
            category: "Electronics",
            price: "$99.99",
            stocked: true,
            name: "iPod Touch"
        },
        {
            city: 77,
            category: "Electronics",
            price: "$399.99",
            stocked: false,
            name: "iPhone 5"
        },
        {
            city: 78,
            category: "Electronics",
            price: "$199.99",
            stocked: true,
            name: "Nexus 7"
        }
    ];

    // category items array
    const uniqItems = (x, i, array) => array.indexOf(x) === i;
    const PRODUCT_CATEGORIES = PRODUCTS.map(prod => prod.category).filter(uniqItems);
    const CITIES_CATEGORIES = PRODUCTS.map(prod => prod.city).filter(uniqItems);
    PRODUCT_CATEGORIES.unshift("all");
    CITIES_CATEGORIES.unshift("all");

    return (<div className="container">
            <header className="jumbotron">
                <h1>Страница с лентой и фильтром</h1>
            </header>

            <FilterableProductTable
                cityCategories={CITIES_CATEGORIES}
                productCategories={PRODUCT_CATEGORIES}
                products={PRODUCTS}
            />

        </div>
    );
}
{/*TODO: Добавить фильтр показа 50, 100, 150, 200 последних*/
}

const mapState = state => ({
    rentAds: state.rent.ads
})

const mapDispatch = dispatch => ({
    fetchAlldispatch: () => dispatch(fetchAll())
})

export default connect(mapState, mapDispatch)(Filter);