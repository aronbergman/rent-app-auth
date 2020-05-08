import React from "react";
import ProductTable from './product-table/product-table.component'
import SearchBar from "./search-bar/search-bar.component";
import FilterByCategory from "./filter-by-category/filter-by-category.component";

// cityCategories={CITY_CATEGORIES}
// productCategories={PRODUCT_CATEGORIES}
// products={PRODUCTS}

export default class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterCategory: "all",
            filterCity: "all",
            filterText: "",
            inStockOnly: false
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
        this.handleFilterCategoryChange = this.handleFilterCategoryChange.bind(this);
        this.handleFilterCityChange = this.handleFilterCityChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockChange(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        });
    }

    handleFilterCategoryChange(filterCategory) {
        this.setState({
            filterCategory: filterCategory
        })
    }

    handleFilterCityChange(filterCity) {
        this.setState({
            filterCity: filterCity
        })
    }

    render() {
        return (
            <div className="container">
                <FilterByCategory
                    categories={this.props.productCategories}
                    cities={this.props.cityCategories}
                    filterCategory={this.state.filterCategory}
                    onFilterCategoryChange={this.handleFilterCategoryChange}
                    onFilterCityChange={this.handleFilterCityChange}
                />
                <div className="products">
                    <SearchBar
                        filterText={this.state.filterText}
                        inStockOnly={this.state.inStockOnly}
                        onInStockChange={this.handleInStockChange}
                        onFilterTextChange={this.handleFilterTextChange}
                    />
                    <ProductTable
                        products={this.props.products}
                        filterCategory={this.state.filterCategory}
                        filterCity={this.state.filterCity}
                        filterText={this.state.filterText}
                        inStockOnly={this.state.inStockOnly}
                    />
                </div>
            </div>
        );
    }
}