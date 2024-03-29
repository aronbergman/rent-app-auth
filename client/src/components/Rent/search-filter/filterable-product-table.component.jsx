import React from 'react';
import ProductTable from './product-table/product-table.component'
import SearchBar from './search-bar/search-bar.component';
import FilterByCategory from './filter-by-category/filter-by-category.component';
import {connect} from 'react-redux';
import * as reducer from "../../../redux/reducers/rent.reducer";
import {Link} from "react-router-dom";
import {Button} from "antd";
import classes from './styles.module.scss'

const FilterableProductTable = props => {
    return (
        <div className="container">
            <div className={classes.CreateAd}>
                <Link to='/rent/create-ad'>
                    <Button type="primary" shape="round" size='large'>
                        Создать объявление
                    </Button>
                </Link>
            </div>

            <FilterByCategory
                onFilterCategoryChange={props.onFilterCategoryChange}
                onFilterCityChange={props.onFilterCityChange}
                onFilterSizeChange={props.onFilterSizeChange}
                categories={props.productCategories}
                cities={props.cityCategories}
                sizes={props.sizeCategories}
                filterCategory={props.filterCategory}
            />
            <div className="products">
                <SearchBar
                    onFilterTextChange={props.onFilterTextChange}
                    onInStockChange={props.onInStockChange}
                    filterText={props.filterText}
                    inStockOnly={props.inStockOnly}
                />
                <ProductTable
                    rentAds={props.rentAds}
                    filterCategory={props.filterCategory}
                    filterCity={props.filterCity}
                    filterSize={props.filterSize}
                    filterText={props.filterText}
                    inStockOnly={props.inStockOnly}
                    limit={props.limit}
                    hasMore={props.hasMore}
                />
            </div>
        </div>
    );
};

const mapState = state => ({
    filterCategory: state.rent.filter.filterCategory,
    filterCity: state.rent.filter.filterCity,
    filterSize: state.rent.filter.filterSize,
    filterText: state.rent.filter.filterText,
    inStockOnly: state.rent.filter.inStockOnly,
})

const mapDispatch = dispatch => ({
    onFilterCategoryChange: data => dispatch(reducer.handleFilterCategoryChange(data)),
    onFilterCityChange: data => dispatch(reducer.handleFilterCityChange(data)),
    onFilterSizeChange: data => dispatch(reducer.handleFilterSizeChange(data)),
    onFilterTextChange: data => dispatch(reducer.handleFilterTextChange(data)),
    onInStockChange: data => dispatch(reducer.handleInStockChange(data)),
})

export default connect(mapState, mapDispatch)(FilterableProductTable)