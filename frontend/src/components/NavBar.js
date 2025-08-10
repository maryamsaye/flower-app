import ShoppingBag from '../assets/shoppingbag.svg';
import './NavBar.css';
import { Link, useNavigate } from "react-router-dom";
import Menu from './Menu';
import { useState, useEffect } from 'react';

const NavBar = () => {
  const [openHamburger, setOpenHamburger] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  return (
    <>
      <div className="header">
        <div className="header-icons">
          <div className="header-ic ham">
            <Link className='burger-link' onClick={() => setOpenHamburger(true)}>&#9776;</Link>            
          </div> 
          <div className="header-ic shopbag">
            <Link to="/cart"><img src={ShoppingBag} alt="" /></Link>
          </div>
        </div>
      </div>
      <Menu isOpen={openHamburger} onClose={() => setOpenHamburger(false)} />

      <div className="header-desk">
        <div className="shop-contact">
          <Link to="/shop" className='burger-lnk'>
            <div className="shop-desk">
              <p>Shop</p>
            </div>
          </Link>

          <Link to="/contact" className='burger-link'>
            <div className="contact-desk">
              <p>Contact</p>
            </div>
          </Link>
        </div>

        <div className="sign-cart">
          {!isLoggedIn ? (
            <Link to="/signin" className='burger-link'>
              <div className="sign-desk">
                <p>Sign in</p>
              </div>
            </Link>
          ) : (
            <div className="sign-desk" onClick={handleLogout} style={{ cursor: "pointer" }}>
              <p>Sign out</p>
            </div>
          )}

          <Link to="/cart" className='burger-lnk'>
            <div className="cart-desk">
              <p>Cart</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;