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

    const PRODUCTS =  [
        {
            id: 1,
            username: 'aronbergman',
            email: 'brgmn@icloud.com',
            typeOfApplicant: 0,
            typeOfObject: 'room',
            sizeOfObject: 4,
            city: 78,
            metroStations: null,
            distanceMetro: null,
            description: null,
            price: 34000,
            floor: null,
            infrastructure: null,
            deposit: null,
            renovation: '2',
            active: 1,
            userId: 1,
            createdAt: '2020-05-07T20:03:43.000Z',
            updatedAt: '2020-05-07T20:03:43.000Z'
        },
        {
            id: 2,
            username: 'aronbergmghtjykuian',
            email: 'brgmn@icloud.com',
            typeOfApplicant: 0,
            typeOfObject: 'flat',
            sizeOfObject: 4,
            city: 77,
            metroStations: null,
            distanceMetro: null,
            description: null,
            price: 13560,
            floor: null,
            infrastructure: null,
            deposit: null,
            renovation: '2',
            active: 1,
            userId: 1,
            createdAt: '2020-05-07T20:03:43.000Z',
            updatedAt: '2020-05-07T20:03:43.000Z'
        },
        {
            id: 3,
            username: 'gthsryju',
            email: 'brgmn@icloud.com',
            typeOfApplicant: 1,
            typeOfObject: 'bad',
            sizeOfObject: 4,
            city: 77,
            metroStations: null,
            distanceMetro: null,
            description: null,
            price: 20000,
            floor: null,
            infrastructure: null,
            deposit: null,
            renovation: '2',
            active: 1,
            userId: 1,
            createdAt: '2020-05-07T20:03:43.000Z',
            updatedAt: '2020-05-07T20:03:43.000Z'
        }
    ];

    // category items array
    const uniqItems = (x, i, array) => array.indexOf(x) === i;
    const PRODUCT_CATEGORIES = PRODUCTS.map(prod => prod.typeOfApplicant).filter(uniqItems);
    const SIZE_CATEGORIES = PRODUCTS.map(prod => prod.typeOfObject).filter(uniqItems);
    const CITIES_CATEGORIES = PRODUCTS.map(prod => prod.city).filter(uniqItems);
    PRODUCT_CATEGORIES.unshift("all");
    CITIES_CATEGORIES.unshift("all");
    SIZE_CATEGORIES.unshift("all");

    return (<div className="container">
            <header className="jumbotron">
                <h1>Страница с лентой и фильтром</h1>
            </header>

            <FilterableProductTable
                cityCategories={CITIES_CATEGORIES}
                productCategories={PRODUCT_CATEGORIES}
                sizeCategories={SIZE_CATEGORIES}
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