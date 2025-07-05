import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaShoppingBag, FaTimes } from "react-icons/fa";
import {
  FaInstagram,
  FaPinterest,
  FaFacebookF,
  FaTwitter,
  FaTelegramPlane,
} from "react-icons/fa";

import "./NavBar.css";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="utility-nav">
      {/* Mobile/Tablet Nav */}
      <div className="mobile-nav">
        <button className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        <Link to="/product" className="shop-icon">
          <FaShoppingBag size={20} />
        </Link>
      </div>

      {/* Slide-out menu */}
      {menuOpen && (
<div className="mobile-menu">

  <button className="close-menu-icon" onClick={closeMenu} aria-label="Close menu">
    <FaTimes size={24} />
  </button>
  <div className="menu-links">
    <Link to="/signin" onClick={closeMenu}>Sign In</Link>
    <Link to="/product" onClick={closeMenu}>Shop</Link>
    <Link to="/service" onClick={closeMenu}>Service</Link>
    <Link to="/contact" onClick={closeMenu}>Contact</Link>
    <Link to="/about" onClick={closeMenu}>About Us</Link>
    <Link to="/shipping" onClick={closeMenu}>Shipping & Returns</Link>
    <Link to="/terms" onClick={closeMenu}>Terms & Conditions</Link>
    <Link to="/privacy" onClick={closeMenu}>Privacy Policy</Link>
  </div>

  <div className="menu-socials">
  <button className="icon-button" aria-label="Instagram">
    <FaInstagram size={20} />
  </button>
  <button className="icon-button" aria-label="Pinterest">
    <FaPinterest size={20} />
  </button>
  <button className="icon-button" aria-label="Facebook">
    <FaFacebookF size={20} />
  </button>
  <button className="icon-button" aria-label="Twitter">
    <FaTwitter size={20} />
  </button>
  <button className="icon-button" aria-label="Telegram">
    <FaTelegramPlane size={20} />
  </button>
</div>

</div>

      )}

      {/* Desktop Nav */}
      <div className="desktop-nav">
        <div className="utility-left">
          <Link to="/products" className="nav-box">Shop</Link>
          <Link to="/contact" className="nav-box">Contact</Link>
        </div>
        <div className="nav-right">
          <Link to="/signin" className="nav-box">Sign In</Link>
          <Link to="/cart" className="cart">Cart 🛒</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;