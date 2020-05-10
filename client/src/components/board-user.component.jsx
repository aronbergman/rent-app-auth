import React from "react";
import withAuth from "../HOC/withAuth";
import {USER} from "../constants/roles.constants";

const AdminPanel = props => {

  const currentUser = JSON.parse(localStorage.getItem('user'))

  return (
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> USER BOARD, YEEES!
          </h3>
        </header>
  );
}

export default withAuth(AdminPanel, USER)