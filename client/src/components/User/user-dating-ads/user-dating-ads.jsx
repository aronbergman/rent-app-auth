import React, {useEffect} from 'react';
import {actionGetUserAds} from "../../../redux/thunks/dating.thunks";
import {connect} from "react-redux";
import Loader from "../../Loader/Loader";
import classes from "../../styles.module.scss";
import AdCardComponent from "../../Dating/single-category/ad-card.component";
import {Link} from "react-router-dom";
import DefaultLayout from "../../Layouts/default.layout";
import AdCardDatingAdminHeader from "../../Dating/single-dating-ad/admin-header/admin-header";

const UserDatingAds = props => {

    const currentUser = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        props.getUserAds(currentUser)
    }, [])

    return (
        props.loaded ? <div>
            <DefaultLayout>
                <h2>Мои объявления на Доске</h2>
                {props.ads ? props.ads.map(ad => (
                    <div key={ad.id}>
                        <AdCardDatingAdminHeader history={props.history} ad={ad}/>
                        <div className={classes.NotClick}>
                            <AdCardComponent ad={ad}/>
                        </div>
                    </div>
                )) : <Loader/>}
                {!props.ads.length && <div>Объявлений не найдено, <Link to="/dating/create">создайте новое</Link></div>}
            </DefaultLayout>
        </div> : <Loader/>
    );
};

const mapState = state => ({
    loaded: state.app.loaded,
    ads: state.dating.ads
})

const mapDispatch = dispatch => ({
    getUserAds: currentUser => dispatch(actionGetUserAds({
        id: currentUser.id,
        email: currentUser.email
    }))
})

export default connect(mapState, mapDispatch)(UserDatingAds);
