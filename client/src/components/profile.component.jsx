import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import {actionGetUserAds} from "../redux/thunks/rent-ad.thunks";
import Loader from "./Loader/Loader";
import AdCardComponent from "./Rent/ad-card/ad-card.component";
import AdCardAdminHeader from "./Rent/ad-card/admin-header/ad-card-admin-header.component";

const Profile = props => {

    const currentUser = JSON.parse(localStorage.getItem('user'))

    const [ads, setAds] = useState('')

    useEffect(() => {
        props.getUserAds(currentUser)
            .then(res => {
                console.log(res)
                setAds(res)
            })
    }, [])

    console.log(ads)
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>

            <p>
                <strong>Email:</strong>{" "}
                {currentUser.email}
            </p>

            <div>
                <h2>Мои объявления</h2>
                {ads ? ads.map(ad => (
                    <div key={ad.id}>
                        <AdCardAdminHeader
                            ad={ad}/>
                        <AdCardComponent
                            ad={ad}
                        />
                    </div>
                )) : <Loader/>}
            </div>
        </div>
    );
}

const mapDispatch = dispatch => ({
    getUserAds: currentUser => dispatch(actionGetUserAds({
        id: currentUser.id,
        email: currentUser.email
    }))
})

export default connect(null, mapDispatch)(Profile);