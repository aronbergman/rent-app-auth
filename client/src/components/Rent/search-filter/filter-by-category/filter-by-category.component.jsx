import React from 'react';
import {Select} from 'antd';
import classes from './styles.module.scss'

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
                {city === 77 ? 'в Москве' : city === 78 ? 'в Санкт-Петербурге' : city === 66 ? 'в Екатеринбурге' : 'в любом городе'}
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
            <strong><span className={classes.Icon}>✨</span> <span className={classes.IMake}>Я ХОЧУ</span></strong>
            <Select
                className={classes.Select}
                defaultValue="снять и сдать" style={{width: '180px'}} onChange={handleChange}>
                {itemsCategories.map(category => (
                <Option value={category}>{category}</Option>
                ))}
            </Select>
            <Select
                className={classes.Select}
                defaultValue="жильё" style={{width: '133px'}} onChange={handleChange}>
                {itemsSizes.map(size => (
                    <Option value={size}>{size}</Option>
                ))}
            </Select>
            <Select
                className={classes.Select}
                defaultValue="в любом городе" style={{width: '240px'}} onChange={handleChange}>
                {itemsCities.map(city => (
                    <Option value={city}>{city}</Option>
                ))}
            </Select>
        </div>
    );
};

export default FilterByCategory