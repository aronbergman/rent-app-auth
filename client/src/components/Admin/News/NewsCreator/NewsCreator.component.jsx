import React from 'react';
import {ADMIN} from "../../../../constants/roles.constants";
import withAuth from "../../../../HOC/withAuth";

const NewsCreator = () => {
    return (
        <div>
            NewsCreator
        </div>
    );
};

export default withAuth(NewsCreator, ADMIN);
