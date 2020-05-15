import React from "react";
import {USER} from "../../../constants/roles.constants";
import withAuth from "../../../HOC/withAuth";
import Header from "./../../Header/Header.component";
import Layout from "../Layout";

const MessagesPage = () => {

    const currentUser = JSON.parse(localStorage.getItem('user'))

    return (
        <div>
            <Header>
                <h2>Сообщения</h2>
            </Header>
            <Layout/>
        </div>
    );
}


export default withAuth(MessagesPage, USER);