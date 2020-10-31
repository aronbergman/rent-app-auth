import React from "react";
import withAuth from "../HOC/withAuth";
import {USER} from "../constants/roles.constants";
import DefaultLayout from "./Layouts/default.layout";
import {Tab, Tabs} from "react-bootstrap";
import UserRentAds from "./User/user-rent-ads/user-rent-ads";
import Header from "./Header/Header.component";

const AdminPanel = () => {
    return (<div>
            <Header>
                <h2>Мои объявления</h2>
            </Header>
            <DefaultLayout>
                <br/>
                <Tabs defaultActiveKey="rent" id="uncontrolled-tab-example">
                    <Tab eventKey="rent" title="Аренда">
                        <UserRentAds/>
                    </Tab>
                </Tabs>
            </DefaultLayout>
        </div>
    );
}

export default withAuth(AdminPanel, USER)