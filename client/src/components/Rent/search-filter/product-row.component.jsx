import React from "react";

export default class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ? (
            product.username
        ) : (
            <span style={{color: "red"}}>{product.username}</span>
        );

        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}