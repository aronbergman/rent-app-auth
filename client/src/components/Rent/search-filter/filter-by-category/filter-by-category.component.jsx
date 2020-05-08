import React from "react";

export default class FilterByCategory extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterCategoryChange = this.handleFilterCategoryChange.bind(this);
    }

    handleFilterCategoryChange(category) {
        this.props.onFilterCategoryChange(category);
    }

    render() {
        const items = [];

        this.props.categories.forEach(category => {
            items.push(
                <button
                    className="category__item"
                    key={category}
                    onClick={() => this.handleFilterCategoryChange(category)}
                >
                    {category}
                </button>
            );
        });

        return (
            <div className="categories">
                <h2>Filter By Category</h2>
                {items}
            </div>
        );
    }
}
