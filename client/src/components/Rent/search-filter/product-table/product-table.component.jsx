import React from "react";
import ProductRow from "../product-row.component";

export default class ProductTable extends React.Component {
    render() {
        const rows = [];
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;
        const filterCategory = this.props.filterCategory;

        this.props.products.forEach(product => {
            const name = product.name.toLowerCase();
            if (name.indexOf(filterText.toLowerCase())) {
                return;
            }
            if (filterCategory !== product.category && filterCategory !== 'all') {
                return;
            }
            if (inStockOnly && !product.stocked) {
                return;
            }
            rows.push(<ProductRow product={product} key={product.name}/>);
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
