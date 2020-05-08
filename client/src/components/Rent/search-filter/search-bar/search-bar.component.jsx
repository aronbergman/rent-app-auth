import React from 'react';
import {Input, Switch} from "antd";
import classes from './styles.module.scss'

const SearchBar = props => {

    const handleFilterTextChange = e => {
        props.onFilterTextChange(e.target.value);
    }

    const handleInStockChange = e => {
        props.onInStockChange(e);
    }

    return (
        <div className={classes.SearchBar}>

            <Input placeholder="Найти по заголовку..." onChange={handleFilterTextChange}/>

            <Switch defaultChecked={props.inStockOnly} onChange={handleInStockChange}/> Объявления только
            зарегистрированных пользователей

        </div>
    );
};

export default SearchBar;