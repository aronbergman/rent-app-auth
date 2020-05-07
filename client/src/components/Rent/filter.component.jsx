import React, {useEffect} from "react";
import {fetchAll} from "../../redux/thunks/rent-ad.thunks";
import {connect} from "react-redux";
import Loader from "../Loader/Loader";
import AdCardComponent from "./ad-card/ad-card.component";

const Filter = props => {

    useEffect(() => {
        props.fetchAlldispatch()
        // eslint-disable-next-line
    }, [])

    const ads = props.rentAds.filter(ad => ad.active === 1)

    return (<div className="container">
            <header className="jumbotron">
                <h1>Страница с лентой и фильтром</h1>
            </header>

            {props.rentAds ? ads.map((ad) => {
                return <AdCardComponent
                    ad={ad}
                    key={ad.id}/>
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