import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navibar from './Navibar';
import ItemsDisplay from './ItemsDisplay';
import Footer from './Footer';
import ProductDisplay from './ProductDisplay';
import NotFound from './NotFound';
import Cart from './Cart';
import Login from './Login';
import SignIn from './SignIn';
import ForgotPass from './ForgotPass';
import Loading from './Loading';
import AuthRoute from './AuthRoute';
import UserRoute from './UserRoute';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(() => {
    const savedDataString = localStorage.getItem("my-cart") || "{}";
    return JSON.parse(savedDataString);
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios.get("https://myeasykart.codeyogi.io/me", {
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        setUser(response.data);
        setLoading(false);
      }).catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleAddToCart = useCallback((productID, count) => {
    const newCart = { ...cart, [productID]: count };
    setCart(newCart);
    localStorage.setItem("my-cart", JSON.stringify(newCart));
  }, [cart]);

  const changeCart = useCallback((id) => {
    const newCart = { ...cart };
    delete newCart[id];
    setCart(newCart);
    localStorage.setItem("my-cart", JSON.stringify(newCart));
  }, [cart]);

  const updateCart = useCallback((newCart) => {
    setCart(newCart);
    localStorage.setItem("my-cart", JSON.stringify(newCart));
  }, []);

  const totalOrder = useMemo(() => {
    return Object.keys(cart).reduce((previous, current) => {
      return previous + cart[current];
    }, 0);
  }, [cart]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Navibar totalCount={totalOrder} />
      <div className='grow flex flex-col'>
        <Routes>
          <Route path="/forgot-pass" element={<ForgotPass />} />
          <Route path='/signin' element={<AuthRoute user={user}><SignIn setUser={setUser} /></AuthRoute>} />
          <Route path='/login' element={<AuthRoute user={user}><Login setUser={setUser} /></AuthRoute>} />
          <Route path="/" element={<ItemsDisplay />} />
          <Route path="/cart" element={<UserRoute user={user}><Cart cart={cart} removeProduct={changeCart} updateCart={updateCart} /></UserRoute>} />
          <Route path="/product/:sku" element={<UserRoute user={user}><ProductDisplay onAddToCart={handleAddToCart} /></UserRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
