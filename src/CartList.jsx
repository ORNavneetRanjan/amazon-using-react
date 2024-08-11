import React from "react";
import SingleItem from "./SingleItem";
import { withCart } from "./withProvider";

function CartList({ cart }) {
  return (
    <>
      {cart.map((item) => (
        <SingleItem
          key={item.product.id}
          link={item.product.thumbnail}
          title={item.product.title}
          price={item.product.price}
          quantity={item.quantity}
          id={item.product.id}
        />
      ))}
    </>
  );
}

export default withCart(CartList);
