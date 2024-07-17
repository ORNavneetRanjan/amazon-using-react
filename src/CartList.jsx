import React from "react";
import SingleItem from "./SingleItem";

function CartList({ data, item }) {
    console.log(data, item);
    return (
        <>
            {data.map(product => (
                <SingleItem
                    key={product.id}
                    link={product.thumbnail}
                    title={product.title}
                    price={product.price}
                    quantity={item[product.id]}
                />
            ))}
        </>
    );
}

export default CartList;
