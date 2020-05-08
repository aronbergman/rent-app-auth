import React from "react";

export default class FilterByCategory extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterCategoryChange = this.handleFilterCategoryChange.bind(this);
        this.handleFilterCityChange = this.handleFilterCityChange.bind(this);
    }

    handleFilterCategoryChange(category) {
        this.props.onFilterCategoryChange(category);
    }

    handleFilterCityChange(category) {
        this.props.onFilterCityChange(category);
    }

    render() {
        const itemsCategories = [];
        const itemsCities = [];

        this.props.categories.forEach(category => {
            itemsCategories.push(
                <button
                    className="category__item"
                    key={category}
                    onClick={() => this.handleFilterCategoryChange(category)}
                >
                    {category}
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
                    {city}
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
                <br/>
            </div>
        );
    }
}
