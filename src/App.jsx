import React, { useState, useMemo, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import Navibar from "./Navibar";
import ItemsDisplay from "./ItemsDisplay";
import Footer from "./Footer";
import ProductDisplay from "./ProductDisplay";
import NotFound from "./NotFound";
import Cart from "./Cart";
import Login from "./Login";
import SignIn from "./SignIn";
import ForgotPass from "./ForgotPass";
import AuthRoute from "./AuthRoute";
import UserRoute from "./UserRoute";
import Profile from "./Profile";
import Alert from "./Alert.jsx";
import UserProvider from "./provider/UserProvider";
import AlertProvider from "./provider/AlertProvider";

function App() {
  const [cart, setCart] = useState(() => {
    const savedDataString = localStorage.getItem("my-cart") || "{}";
    return JSON.parse(savedDataString);
  });

  const handleAddToCart = useCallback(
    (productID, count) => {
      const newCart = { ...cart, [productID]: count };
      setCart(newCart);
      localStorage.setItem("my-cart", JSON.stringify(newCart));
    },
    [cart]
  );

  const changeCart = useCallback(
    (id) => {
      const newCart = { ...cart };
      delete newCart[id];
      setCart(newCart);
      localStorage.setItem("my-cart", JSON.stringify(newCart));
    },
    [cart]
  );

  const updateCart = useCallback((newCart) => {
    setCart(newCart);
    localStorage.setItem("my-cart", JSON.stringify(newCart));
  }, []);

  const totalOrder = useMemo(() => {
    return Object.keys(cart).reduce((previous, current) => {
      return previous + cart[current];
    }, 0);
  }, [cart]);

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <UserProvider>
        <AlertProvider>
          <Navibar totalCount={totalOrder} />
          <div className="grow flex flex-col">
            <Alert />
            <Routes>
              <Route path="/forgot-pass" element={<ForgotPass />} />
              <Route
                path="/profile"
                element={
                  <UserRoute>
                    <Profile setCart={setCart} />
                  </UserRoute>
                }
              />
              <Route
                path="/signin"
                element={
                  <AuthRoute>
                    <SignIn />
                  </AuthRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <AuthRoute>
                    <Login />
                  </AuthRoute>
                }
              />
              <Route path="/" element={<ItemsDisplay />} />
              <Route
                path="/cart"
                element={
                  <UserRoute>
                    <Cart
                      cart={cart}
                      removeProduct={changeCart}
                      updateCart={updateCart}
                    />
                  </UserRoute>
                }
              />
              <Route
                path="/product/:sku"
                element={
                  <UserRoute>
                    <ProductDisplay onAddToCart={handleAddToCart} />
                  </UserRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </AlertProvider>
      </UserProvider>
    </div>
  );
}

export default App;
