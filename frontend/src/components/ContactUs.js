import React from 'react'; 
import './ContactUs.css';
import storefrontImg from '../assets/storefront.png'; 
import { FaInstagram, FaPinterestP, FaFacebookF, FaTwitter, FaTelegram } from 'react-icons/fa';

const ContactUs = () => {
  return (                                              
    <div className="section">
      <section className="contact-form-section">

        {/* Right Column */}
        <div className="form-right">
          <img src={storefrontImg} alt="Kyiv LuxeBouquets storefront" />
          
          <div className="follow"> 
            <h3>Follow us:</h3>
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                <FaPinterestP />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
                <FaTelegram />
              </a>
            </div>
          </div>
        </div>

        {/* Left Column */}
        <div className="form-left">
          <h2>To Contact Us</h2>
          <p className="form-description">Leave your number and we'll get back to you shortly</p>
          
          <form className="phone-form">
            <input type="tel" placeholder="+380 XX XXX XX XX" required />
            <button type="submit">BOOK A CALL</button>
          </form>

          <div className="contact-details">
            <div className="detail-block">
              <h4>Phone</h4>
              <p>+380980099777</p>
              <p>+380980099111</p>
            </div>
            
            <div className="detail-block">
              <h4>Address</h4>
              <p>8 to 11 P.M.</p>
              <p>15/4 Khreshchatyk Street, Kyiv</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
