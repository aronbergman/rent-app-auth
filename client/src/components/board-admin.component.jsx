import React from "react";
import AdminLayout from "./Layouts/admin.layout";
import withAuth from "../HOC/withAuth";
import {ADMIN} from "../constants/roles.constants";

const AdminPanel = props => {

    return (
        <AdminLayout history={props.history}>
            ADMIN BOARD, YEEES!
        </AdminLayout>
    );
}

export default withAuth(AdminPanel, ADMIN);