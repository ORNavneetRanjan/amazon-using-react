import React from "react";
import Product from "./Product";

function ProductList({ data }) {
  return (
    <>
      <div className="py-3 flex flex-wrap item-center justify-center gap-2 lg:gap-5 ">
        {data.map(function display(product) {
          return (
            <Product
              key={
                product.title + product.decription + product.price + product.id
              }
              link={product.thumbnail}
              title={product.title}
              discription={product.description}
              price={product.price}
              id={product.id}
              brand={product.brand}
            />
          );
        })}
      </div>
    </>
  );
}

export default ProductList;
