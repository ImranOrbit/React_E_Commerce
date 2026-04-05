import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import Banner from "./Component/Banner/Banner";
import Products from "./Component/Products/Products";
import ProductDetails from "./Component/Products/ProductDetails";
import About from "./Component/About/About";
import Contact from "./Component/Contact/Contact";
import Login from "./Auth/Login";
import Register from "./Auth/Registration";
import ForgotPassword from "./Auth/ForgotPassword";
import Cart from "./Component/Cart/Cart";
import Profile from "./Auth/Profile";
import OrdersPage from "./Component/Orders/OrdersPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />

        {/* Home page */}
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Products />
            </>
          }
        />

        {/* Product Details page */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* About page */}
        <Route path="/about" element={<About />} />

        {/* Contact page */}
        <Route path="/contact" element={<Contact />} />

        {/* Products page (optional full page) */}
        <Route path="/products" element={<Products />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;