import React from "react";

export default class FilterByCategory extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterCategoryChange = this.handleFilterCategoryChange.bind(this);
        this.handleFilterCityChange = this.handleFilterCityChange.bind(this);
        this.handleFilterSizeChange = this.handleFilterSizeChange.bind(this);
    }

    handleFilterCategoryChange(category) {
        this.props.onFilterCategoryChange(category);
    }

    handleFilterCityChange(city) {
        this.props.onFilterCityChange(city);
    }

    handleFilterSizeChange(size) {
        this.props.onFilterSizeChange(size);
    }

    render() {
        const itemsCategories = [];
        const itemsCities = [];
        const itemsSizes = [];

        this.props.categories.forEach(category => {
            itemsCategories.push(
                <button
                    className="category__item"
                    key={category}
                    onClick={() => this.handleFilterCategoryChange(category)}
                >
                    {category === 0 ? 'Я хочу снять' : category === 1 ? 'Я хочу сдать' : 'Все'}
                </button>
            );
        });

        this.props.cities.forEach(city => {
            itemsCities.push(
                <button
                    className="category__item"
                    key={city}
                    onClick={() => this.handleFilterCityChange(city)}
                >
                    {city === 77 ? 'Москва' : city === 78 ? 'Санкт-Петербург' : city === 66 ? 'Екатеринбург' : 'Любой'}
                </button>
            );
        });

        this.props.sizes.forEach(size => {
            itemsSizes.push(
                <button
                    className="category__item"
                    key={size}
                    onClick={() => this.handleFilterSizeChange(size)}
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
    }
}
