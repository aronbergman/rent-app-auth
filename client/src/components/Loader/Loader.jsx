import React from 'react';
import {Spinner} from 'react-bootstrap'
import classes from './Loader.module.scss'

export default () => (
    <Spinner animation="border" role="status" className={classes.Loader}>
        <span className="sr-only">Loading...</span>
    </Spinner>
);
