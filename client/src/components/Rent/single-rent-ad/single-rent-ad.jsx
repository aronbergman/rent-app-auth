import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {handlerSingleRentAd} from "../../../redux/thunks/rent-ad.thunks";
import Loader from "../../Loader/Loader";
import {cityParser} from "../../../helpers/rentDataParsers";
import dateParser from "../../../helpers/dateParser";
import AdCardComponent from "../ad-card/ad-card.component";

const SingleRentAd = props => {
    const [ad, setAd] = useState('')

    useEffect(() => {
        const id = props.match.params.id
        props.fetchSingleRentAd(id).then(res => setAd(res))
    }, [])

    console.log(ad);
    return (
        ad ? <AdCardComponent ad={ad}/> : <Loader/>
    );
};

const mapDispatch = dispatch => ({
    fetchSingleRentAd: id => dispatch(handlerSingleRentAd(id))
})

export default connect(null, mapDispatch)(SingleRentAd);
