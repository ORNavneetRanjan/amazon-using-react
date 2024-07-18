import React, { useEffect, useState } from "react";
import { getProductData } from "./app";
import Loading from "./Loading";
import CartList from "./CartList";

function Cart({ initialCart }) {
    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);
    const [cart, setCart] = useState(initialCart);

    function changeCart(id) {
        const newCart = { ...cart };
        delete newCart[id];

        setCart(newCart);
        const cartString = JSON.stringify(newCart);
        localStorage.setItem("my-cart", cartString);
    }

    useEffect(() => {
        const arr = Object.keys(cart);
        try {
            Promise.all(arr.map(id => getProductData(id))).then(response => {
                setProductList(response);
                setLoading(false);
            });
        } catch (error) {
            console.error("Error fetching product data", error);
            setLoading(false);
        }
    }, [cart]);

    console.log(productList);
    if (loading) {
        return <Loading />
    }
    if (!cart || Object.keys(cart).length === 0) {
        return (
            <>
            <div className="grow bg-gray-200 px-10 py-8 lg:px-44 w-screen">
            <div className="bg-white p-10 max-w-screen-lg m-auto">
                <h1 className="text-center text-sky-400 font-sans text-5xl">No items in the cart</h1>
            </div>
            </div>
            </>
        );
    }

    const total = productList.reduce((acc, product) => {
        return acc + product.price * cart[product.id];
    }, 0);

    console.log(total);
    return (
        <div className="bg-gray-200 px-10 py-8 lg:px-44 w-screen min-h-screen">
            <div className="bg-white p-10 max-w-screen-lg m-auto">
                <div className="invisible lg:visible grid grid-cols-6 items-center bg-gray-200 p-4 mb-4 border-2">
                    <h2 className="col-span-3 text-center text-xl font-bold">Product</h2>
                    <h2 className="text-xl font-bold">Price</h2>
                    <h2 className="text-xl font-bold">Quantity</h2>
                    <h2 className="text-xl font-bold">Subtotal</h2>
                </div>

                <CartList data={productList} item={cart} remove={changeCart} />

                <div className="gap-5 p-3 flex flex-col lg:flex-row justify-between">
                    <div className="flex flex-col lg:flex-row gap-2">
                        <input className="w-60 p-2 border shadow-md text-gray-400 text-xl font-sans" type="text" placeholder="Coupon code" />
                        <button className="w-60 text-xl bg-sky-400 text-white text-center p-2 rounded-md">APPLY COUPON</button>
                    </div>

                    <button className="w-60 text-xl bg-sky-400 text-white text-center p-2 rounded-md">UPDATE CART</button>
                </div>
                <div className="w-full flex flex-row-reverse mt-10">
                    <div className="w-1/2 self-end border-1 shadow-md gap-5">
                        <h1 className="font-bold bg-gray-400 text-xl p-2">Cart Total</h1>
                        <div className="flex flex-col gap-3 p-2 ">
                            <h2>Subtotal = ${total}</h2>
                            <h2>Total = ${total}</h2>
                        </div>
                        <button className="w-full text-2xl bg-sky-400 text-white text-center p-2 rounded-md">Proceed To Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
