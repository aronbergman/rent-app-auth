import React from "react";
import withAuth from "../HOC/withAuth";
import {MODERATOR} from "../constants/roles.constants";

const AdminPanel = () => {

    return (
        <header className="jumbotron">
            <h3>
                MODERATOR BOARD, YEEES!
            </h3>
        </header>
    );
}

export default withAuth(AdminPanel, MODERATOR);