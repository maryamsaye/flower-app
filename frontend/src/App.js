import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import Category from "./pages/Category"; 
import AboutUs from "./pages/AboutUs";
import Product from './pages/Product';
// import Subscription from './pages/Subscription';
import Cart from './pages/UserPages/Cart';
import SignIn from './pages/UserPages/SignIn';
import SignUp from './pages/UserPages/SignUp'
// import Success from './pages/UserPages/success';
import Hero from "./components/Hero"; 
import ContactUs from "./components/ContactUs"; 
import NavBar from "../src/components/NavBar"
import Footer from "../src/components/Footer"






import './App.css';

function App ()  {
  return (
    <div className="app-container">
      <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:categoryType" element={<Category />} />
      <Route path="/about" element={<AboutUs />}></Route>
      <Route path="/product/:id" element={<Product />} />
      {/* <Route path="/subscription" element={<Subscription />}></Route> */}
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      {/* <Route path="/success" element={<Success />} />    */}
      <Route path="/shop" element={<Hero />} /> 
      <Route path="/contact" element={<ContactUs />} /> 
    </Routes>
    <Footer />

    </>
    </div>
  );
};
    
export default App;
