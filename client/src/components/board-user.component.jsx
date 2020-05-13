import React from "react";
import withAuth from "../HOC/withAuth";
import {USER} from "../constants/roles.constants";
import DefaultLayout from "./Layouts/default.layout";
import {Link} from "react-router-dom";

const AdminPanel = props => {

  const currentUser = JSON.parse(localStorage.getItem('user'))

  return (
        <DefaultLayout>
            <Link to={'/user/rent'}>
                Мои объявления аренды
            </Link>
            <Link to={'/user/dating'}>
                Мои объявления на доске
            </Link>
        </DefaultLayout>
  );
}

export default withAuth(AdminPanel, USER)