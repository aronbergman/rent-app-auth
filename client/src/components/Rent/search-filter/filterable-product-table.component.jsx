import React from "react";
import ProductTable from './product-table/product-table.component'
import SearchBar from "./search-bar/search-bar.component";
import FilterByCategory from "./filter-by-category/filter-by-category.component";

export default class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterCategory: "all",
            filterCity: "all",
            filterSize: "all",
            filterText: "",
            inStockOnly: false
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
        this.handleFilterCategoryChange = this.handleFilterCategoryChange.bind(this);
        this.handleFilterCityChange = this.handleFilterCityChange.bind(this);
        this.handleFilterSizeChange = this.handleFilterSizeChange.bind(this);
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

    handleFilterSizeChange(filterSize) {
        this.setState({
            filterSize: filterSize
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="container">
                <FilterByCategory
                    categories={this.props.productCategories}
                    cities={this.props.cityCategories}
                    sizes={this.props.sizeCategories}
                    filterCategory={this.state.filterCategory}
                    onFilterCategoryChange={this.handleFilterCategoryChange}
                    onFilterCityChange={this.handleFilterCityChange}
                    onFilterSizeChange={this.handleFilterSizeChange}
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
                        filterSize={this.state.filterSize}
                        filterText={this.state.filterText}
                        inStockOnly={this.state.inStockOnly}
                    />
                </div>
            </div>
        );
    }
}