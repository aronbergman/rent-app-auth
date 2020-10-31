import React from 'react';
import { Select } from 'antd';
import classes from './styles.module.scss'
import { cityParser } from "../../../../helpers/rentDataParsers";

const { Option } = Select;

const FilterByCategory = props => {

    const handleFilterCategoryChange = category => {
        props.onFilterCategoryChange(category);
    }

    const handleFilterCityChange = city => {
        props.onFilterCityChange(city);
    }

    const handleFilterSizeChange = size => {
        props.onFilterSizeChange(size);
    }

    const itemsCategories = [];
    const itemsCities = [];
    const itemsSizes = [];

    props.categories.forEach(category => {
        itemsCategories.push(
            <div
                className="category__item"
                key={category}
                onClick={() => handleFilterCategoryChange(category)}
            >
                {category === 0 ? 'сдать' : category === 1 ? 'снять' : 'снять или сдать'}
            </div>
        );
    });

    props.cities.forEach(city => {
        itemsCities.push(
            <div
                className="category__item"
                key={city}
                onClick={() => handleFilterCityChange(city)}
            >
                {cityParser(city)}
            </div>
        );
    });

    props.sizes.forEach(size => {
        itemsSizes.push(
            <div
                className="category__item"
                key={size}
                onClick={() => handleFilterSizeChange(size)}
            >
                {size === 'flat' ? 'квартиру' : size === 'room' ? 'комнату' : size === 'bed' ? 'спальное место' : 'смотрю всё'}
            </div>
        );
    });

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <div id="rent-filter" className={classes.SmartSearch}>
            <div className={classes.Title}>
                <span className={classes.Icon}>✨</span>
                <span className={classes.IMake}>Я ХОЧУ</span>
            </div>
            <Select
                className={classes.SelectCategory}
                defaultValue="снять или сдать" onChange={handleChange}>
                {itemsCategories.map((category, index) => <Option key={index} value={category}>{category}</Option>)}
            </Select>
            <Select
                className={classes.SelectSize}
                defaultValue="смотрю всё" onChange={handleChange}>
                {itemsSizes.map((size, index) => <Option key={index} value={size}>{size}</Option>)}
            </Select>
            <Select
                className={classes.SelectCity}
                defaultValue="в любом городе" onChange={handleChange}>
                {itemsCities.map((city, index) => <Option key={index} value={city.key}>{city}</Option>)}
            </Select>
        </div>
    );
};

export default FilterByCategory