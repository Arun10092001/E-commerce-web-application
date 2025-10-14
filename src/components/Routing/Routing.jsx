import { Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "../Home/HomePage";
import ProductsPage from "../Products/ProductPage";
import LoginPage from "../Authentication/LoginPage";
import SignupPage from "../Authentication/SignupPage";
import OrdersPage from "../MyOrder/MyOrderPage";
import CartPage from "../CartPage/CartPage";
import Logout from "../Authentication/Logout";
import SingleProductPage from "../SingleProduct/SingleProductPage";

const Routing = ({ user, setUser }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<SingleProductPage />} />
      <Route path="/login" element={<LoginPage setUser={setUser} />} />
      <Route path="/signup" element={<SignupPage setUser={setUser} />} />
      <Route path="/myorders" element={<OrdersPage user={user} />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/logout" element={<Logout setUser={setUser} />} />
    </Routes>
  );
};

export default Routing;
