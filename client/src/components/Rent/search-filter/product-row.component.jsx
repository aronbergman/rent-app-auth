import React from 'react';

const ProductRow = props => {
    const product = props.product;
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
};

export default ProductRow;