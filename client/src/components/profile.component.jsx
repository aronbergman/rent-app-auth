import React from "react";
import {USER} from "../constants/roles.constants";
import withAuth from "../HOC/withAuth";

const Profile = () => {

    const currentUser = JSON.parse(localStorage.getItem('user'))

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

        </div>
    );
}

export default withAuth(Profile, USER);