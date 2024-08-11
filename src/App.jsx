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
import { CartContext } from "./Context.jsx";
import CartProvider from "./provider/CartProvider.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <UserProvider>
        <CartProvider>
          <AlertProvider>
            <Navibar />
            <div className="grow flex flex-col">
              <Alert />
              <Routes>
                <Route path="/forgot-pass" element={<ForgotPass />} />
                <Route
                  path="/profile"
                  element={
                    <UserRoute>
                      <Profile />
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
                      <Cart />
                    </UserRoute>
                  }
                />
                <Route
                  path="/product/:sku"
                  element={
                    <UserRoute>
                      <ProductDisplay />
                    </UserRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </AlertProvider>
        </CartProvider>
      </UserProvider>
    </div>
  );
}

export default App;
