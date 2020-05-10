import React, {useEffect} from "react";
import {connect} from 'react-redux'
import Loader from "./Loader/Loader";
import UserService from "../services/user.service";
import {fetchRole} from "../redux/reducers/user.reducer";
import AdminLayout from "./Layouts/admin.layout";

const AdminPanel = props => {

    const currentUser = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        UserService.getAdminBoard().then(response => {
                props.fetchRoleHandler()
            }
        ).catch(() => props.history.push('/profile'));
    }, [])

    return (
        props.loaded
            ? <AdminLayout>
                <strong>{currentUser.username}</strong> ADMIN BOARD, YEEES!
            </AdminLayout>
            : <Loader/>
    );
}

const mapState = state => ({
    loaded: state.user.loaded
})

const mapDispatch = dispatch => ({
    fetchRoleHandler: () => dispatch(fetchRole(true))
})

export default connect(mapState, mapDispatch)(AdminPanel);