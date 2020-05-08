import React from "react";
import ProductRow from "../product-row.component";

export default class ProductTable extends React.Component {
    render() {
        const rows = [];
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;
        const filterCategory = this.props.filterCategory;
        const filterCity = this.props.filterCity;
        const filterSize = this.props.filterSize;

        this.props.products.forEach(product => {
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
    }
}
