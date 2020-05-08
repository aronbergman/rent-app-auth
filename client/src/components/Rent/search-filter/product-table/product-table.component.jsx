import React from "react";
import ProductRow from "../product-row.component";

const ProductTable = props => {
    const rows = [];
    const filterText = props.filterText;
    const inStockOnly = props.inStockOnly;
    const filterCategory = props.filterCategory;
    const filterCity = props.filterCity;
    const filterSize = props.filterSize;

    props.products.forEach(product => {
        const name = product.username.toLowerCase();
        if (name.indexOf(filterText.toLowerCase())) {
            return;
        }
        if (filterCategory !== product.typeOfApplicant && filterCategory !== 'all') {
            return;
        }
        if (filterCity !== product.city && filterCity !== 'all') {
            return;
        }
        if (filterSize !== product.typeOfObject && filterSize !== 'all') {
            return;
        }
        if (inStockOnly && !product.stocked) {
            return;
        }
        rows.push(<ProductRow product={product} key={product.id}/>);
    });

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
};

export default ProductTable;