import React from 'react';
import DatingCategories from "./dating-categories/dating-categories.component";
import DefaultLayout from "../Layouts/default.layout";

const DatingHomePage = () => {
    return (
        <DefaultLayout>
            <DatingCategories/>
        </DefaultLayout>
    );
};

export default DatingHomePage;
