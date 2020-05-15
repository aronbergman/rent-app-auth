import React, {useEffect} from 'react';
import {actionGetUserAds} from "../../../redux/thunks/rent-ad.thunks";
import {connect} from "react-redux";
import Loader from "../../Loader/Loader";
import AdCardAdminHeader from "../../Rent/ad-card/admin-header/ad-card-admin-header.component";
import classes from "../../styles.module.scss";
import AdCardComponent from "../../Rent/ad-card/ad-card.component";
import {Link} from "react-router-dom";
import DefaultLayout from "../../Layouts/default.layout";

const UserRentAds = props => {

    const currentUser = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        props.getUserAds(currentUser)
    }, [])

    return (
        props.loaded ? <div>
            <DefaultLayout>
                <br/>
                {props.ads ? props.ads.map(ad => (
                    <div key={ad.id}>
                        <AdCardAdminHeader history={props.history} ad={ad}/>
                        <div className={classes.NotClick}>
                            <AdCardComponent ad={ad}/>
                        </div>
                    </div>
                )) : <Loader/>}
                {!props.ads.length && <div>Объявлений не найдено, <Link to="/rent/create-ad">создайте новое</Link></div>}
            </DefaultLayout>
        </div> : <Loader/>
    );
};

const mapState = state => ({
    loaded: state.user.isAuthenticated,
    ads: state.rent.ads
})

const mapDispatch = dispatch => ({
    getUserAds: currentUser => dispatch(actionGetUserAds({
        id: currentUser.id,
        email: currentUser.email
    }))
})

export default connect(mapState, mapDispatch)(UserRentAds);
