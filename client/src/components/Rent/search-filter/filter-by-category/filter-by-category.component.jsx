import React from 'react';

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
            <button
                className="category__item"
                key={category}
                onClick={() => handleFilterCategoryChange(category)}
            >
                {category === 0 ? 'Я хочу снять' : category === 1 ? 'Я хочу сдать' : 'Все'}
            </button>
        );
    });

    props.cities.forEach(city => {
        itemsCities.push(
            <button
                className="category__item"
                key={city}
                onClick={() => handleFilterCityChange(city)}
            >
                {city === 77 ? 'Москва' : city === 78 ? 'Санкт-Петербург' : city === 66 ? 'Екатеринбург' : 'Любой'}
            </button>
        );
    });

    props.sizes.forEach(size => {
        itemsSizes.push(
            <button
                className="category__item"
                key={size}
                onClick={() => handleFilterSizeChange(size)}
            >
                {size}
            </button>
        );
    });

    return (
        <div className="categories">
            <h2>Filter By Categories</h2>
            Категория
            {itemsCategories}
            <br/>
            Город:
            {itemsCities}
            <br/>
            Размер:
            {itemsSizes}
            <br/>
            <br/>
        </div>
    );
};

export default FilterByCategory