import React from 'react';

const DefaultLayout = props => {
    return (
        <div className="container">
            {props.children}
        </div>
    );
};

export default DefaultLayout;
