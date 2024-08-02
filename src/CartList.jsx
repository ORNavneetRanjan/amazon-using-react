import React from "react";
import SingleItem from "./SingleItem";

function CartList({ data, item, remove, updateQuantity }) {
    return (
        <>
            {data.map(product => (
                <SingleItem
                    key={product.id}
                    link={product.thumbnail}
                    title={product.title}
                    price={product.price}
                    quantity={item[product.id]}
                    id={product.id}
                    fun={remove}
                    updateQuantity={updateQuantity}
                />
            ))}
        </>
    );
}

export default CartList;
