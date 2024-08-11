import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CartContext } from "../Context";
import { getCart, getProductData, getProductsByIds, saveCart } from "../app";
import { withUser } from "../withProvider";

function CartProvider({ isLoggedIn, children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdated, setUpdate] = useState(false);
  const [quantityMap, setQuantityMap] = useState({});

  useEffect(() => {
    if (!isLoggedIn) {
      const savedDataString = localStorage.getItem("my-cart") || "{}";
      const savedData = JSON.parse(savedDataString);
      getProductsByIds(Object.keys(savedData)).then((products) => {
        const savedCart = products.map((p) => ({
          product: p,
          quantity: savedData[p.id],
        }));
        setCart(savedCart);
        setQuantityMap(savedData);
        setLoading(false);
      });
    } else {
      getCart().then((response) => {
        setCart(response);
        setQuantityMap(cartToQuantityMap(response));
        setLoading(false);
      });
    }
  }, [isLoggedIn]);

  const updateCart = useCallback(
    (updatedQuantityMap) => {
      if (!isLoggedIn) {
        localStorage.setItem("my-cart", JSON.stringify(updatedQuantityMap));
      } else {
        saveCart(updatedQuantityMap);
      }
      setUpdate(false);
      quantityMapToCart(updatedQuantityMap).then((updatedCart) => {
        setCart(updatedCart);
      });
    },
    [isLoggedIn]
  );

  const cartToQuantityMap = (cart) =>
    cart.reduce(
      (m, cartItem) => ({
        ...m,
        [cartItem.product.id]: cartItem.quantity,
      }),
      {}
    );

  const quantityMapToCart = useCallback((map) => {
    return getProductsByIds(Object.keys(map)).then((products) => {
      return products.map((p) => ({
        product: p,
        quantity: map[p.id],
      }));
    });
  }, []);

  const addToCart = useCallback(
    (productID, count) => {
      getProductData(productID).then((response) => {
        setCart((prevCart) => [
          ...prevCart,
          { product: response, quantity: count },
        ]);
        setQuantityMap({ ...quantityMap, [productID]: count });
        updateCart({ ...quantityMap, [productID]: count });
      });
    },
    [quantityMap, updateCart]
  );

  const deleteItems = useCallback(
    (id) => {
      const newQuantityMap = { ...quantityMap };
      delete newQuantityMap[id];
      updateCart(newQuantityMap);
    },
    [quantityMap, updateCart]
  );

  const handleChange = useCallback((productId, newValue) => {
    setQuantityMap((prevQuantityMap) => {
      const newQuantityMap = { ...prevQuantityMap, [productId]: +newValue };
      setUpdate(true);
      return newQuantityMap;
    });
  }, []);

  const totalOrder = useMemo(() => {
    if (!Array.isArray(cart) || cart.length === 0) {
      return 0;
    }
    return cart
      .reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0)
      .toFixed(2);
  }, [cart]);

  const totalCount = useMemo(() => {
    if (!Array.isArray(cart) || cart.length === 0) {
      return 0;
    }
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        deleteItems,
        updateCart,
        totalOrder,
        totalCount,
        quantityMap,
        setQuantityMap,
        handleChange,
        isUpdated,
        setUpdate,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default withUser(CartProvider);
