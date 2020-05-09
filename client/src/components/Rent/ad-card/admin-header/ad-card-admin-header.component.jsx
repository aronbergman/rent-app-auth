import React from 'react';
import classes from './styles.module.scss'
import {Button} from "antd";
import {connect} from "react-redux";
import {handlerDeleteRentAdAuth} from "../../../../redux/thunks/rent-ad.thunks";

const AdCardAdminHeader = (props) => {

    const user = JSON.parse(localStorage.getItem('user'))

    const handlerDeleteUserAd = () => {
        const data = {
            username: user.username,
            id: props.ad.id,
            token: user.token,
            email: user.email
        }
        props.onDeleteUserAd(data).then(() => props.history.push('/rent'))
    }

    return (
        <div className={classes.Header}>
            <Button className={classes.DeleteButton} shape="round" size='large' onClick={handlerDeleteUserAd}>
                Удалить объявление
            </Button>
        </div>
    );
};

const mapDispatch = dispatch => ({
    onDeleteUserAd: data => dispatch(handlerDeleteRentAdAuth(data))
})

export default connect(null, mapDispatch)(AdCardAdminHeader);
