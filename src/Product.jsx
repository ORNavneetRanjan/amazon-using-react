import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ProductDisplay from './ProductDisplay';

function Product(data){
  return (<>
    <div className="bg-white w-52 lg:w-72 p-2 mb-2">
      <img className="w-full object-cover" src={data.link} alt="Product Image" />

      <h2 className="text-lg text-gray-500">{data.brand}</h2>
      <p className="text-xl font-medium">{data.title}</p>
      <p className="text-lg">Price: ${data.price}</p>
      <Link to={"/product/" + data.id} className="text-blue-500">View details</Link>
    </div>
  </>);
}

export default Product;