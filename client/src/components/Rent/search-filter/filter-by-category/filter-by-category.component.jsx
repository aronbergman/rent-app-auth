import React from 'react';
import {Select} from 'antd';
import classes from './styles.module.scss'
import {CITY_66, CITY_77, CITY_78} from "../../../../helpers/rentDataParsers";

const {Option} = Select;

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
                {category === 0 ? 'сдать' : category === 1 ? 'снять' : 'снять и сдать'}
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
                {city === 77 ? CITY_77 : city === 78 ? CITY_78 : city === 66 ? CITY_66 : 'в любом городе'}
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
                {size === 'flat' ? 'квартиру' : size === 'room' ? 'комнату' : size === 'bed' ? 'спальное место' : 'жильё'}
            </div>
        );
    });

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <div id="rent-filter" className={classes.SmartSearch}>
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <div className={classes.Title}>
                <span className={classes.Icon}>✨</span>
                <span className={classes.IMake}>Я ХОЧУ</span>
            </div>
            <Select
                className={classes.SelectCategory}
                defaultValue="снять и сдать" onChange={handleChange}>
                {itemsCategories.map((category, index) => (
                <Option key={index} value={category}>{category}</Option>
                ))}
            </Select>
            <Select
                className={classes.SelectSize}
                defaultValue="жильё" onChange={handleChange}>
                {itemsSizes.map((size, index) => (
                    <Option key={index} value={size}>{size}</Option>
                ))}
            </Select>
            <Select
                className={classes.SelectCity}
                defaultValue="в любом городе" onChange={handleChange}>
                {itemsCities.map((city, index) => (
                    <Option key={index} value={city}>{city}</Option>
                ))}
            </Select>
        </div>
    );
};

export default FilterByCategory