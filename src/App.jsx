import React, { useState, useMemo, useCallback } from 'react';
import Navibar from './Navibar';
import ItemsDisplay from './ItemsDisplay';
import Footer from './Footer';
import { Route, Routes } from 'react-router-dom';
import ProductDisplay from './ProductDisplay';
import NotFound from './NotFound';
import Cart from './Cart';
import Login from './Login';
import SignIn from './SignIn';
import ForgotPass from './ForgotPass';

function App() {
  const savedDataString = localStorage.getItem("my-cart") || "{}";
  const savedData = JSON.parse(savedDataString);

  const [cart, setCart] = useState(savedData);

  const handleAddToCart = useCallback((productID, count) => {
    const old = cart[productID] || 0;
    const newCart = { ...cart, [productID]: old + count };
    setCart(newCart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem("my-cart", cartString);
  }, [cart]);

  const changeCart = useCallback((id) => {
    const newCart = { ...cart };
    delete newCart[id];
    setCart(newCart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem("my-cart", cartString);
  }, [cart]);

  const totalOrder = useMemo(() => {
    return Object.keys(cart).reduce((previous, current) => {
      return previous + cart[current];
    }, 0);
  }, [cart]);

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Navibar totalCount={totalOrder} />
      <div className='grow flex flex-col'>
        <Routes>
          <Route path="/forgot-pass" element={<ForgotPass />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/login' element={<Login />} />
          <Route path="/" element={<ItemsDisplay />} />
          <Route path="/cart" element={<Cart initialCart={cart} fun={changeCart} />} />
          <Route path="/product/:sku" element={<ProductDisplay onAddToCart={handleAddToCart} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
