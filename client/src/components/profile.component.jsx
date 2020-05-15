import React from "react";
import {USER} from "../constants/roles.constants";
import withAuth from "../HOC/withAuth";
import Header from "./Header/Header.component";
import DefaultLayout from "./Layouts/default.layout";

const Profile = () => {

    const currentUser = JSON.parse(localStorage.getItem('user'))

    return (
        <div>
            <Header>
                <h2>Настройки</h2>
            </Header>
            <DefaultLayout>
                <p><strong>Email</strong>: {currentUser.email}</p>
                <p> Сменить email</p>
                <p> Сменить пароль</p>
            </DefaultLayout>
        </div>
    );
}

export default withAuth(Profile, USER);