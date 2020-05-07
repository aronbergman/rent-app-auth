import React, {useEffect} from "react";
import {fetchAll} from "../services/rent-ad.service";
import {connect} from "react-redux";
import Loader from "./Loader/Loader";

const Filter = props => {

    useEffect(() => {
        props.fetchAlldispatch()
    }, [])

    return (<div className="container">
            <header className="jumbotron">
                <h1>Страница с лентой и фильтром</h1>
            </header>

            {props.rentAds.length ? props.rentAds.map(ad => {
                return <div>{ad.email}</div>
            }) : <Loader/>
            }
        </div>
    );
}

const mapState = state => ({
    rentAds: state.rent.ads
})

const mapDispatch = dispatch => ({
    fetchAlldispatch: () => dispatch(fetchAll())
})

export default connect(mapState, mapDispatch)(Filter);