import React, { useEffect, useState } from "react";
import { getProductData } from "./app";
import ProductList from "./ProductList";
import Loading from "./Loading";

function Cart({ cart }) {
    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);
    
    console.log(cart);
    if(!cart){
        return (<>
        <h1>No items in the cart</h1>
        </>);
    }
    const arr = Object.keys(cart);
    useEffect(() => {
        
        const arr = Object.keys(cart);
        try {
            const list = arr.map(id => getProductData(id));
            console.log(list);
            setProductList(list);
        } catch (error) {
            console.error("Error fetching product data", error);
        } finally {
            setLoading(false);
        
        };

    }, [cart]);
    console.log(productList);
    if(loading){
        return <Loading />
    }
    return (
        <>
        
        </>
    );
}

export default Cart;
