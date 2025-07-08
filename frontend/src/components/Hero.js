import React from 'react';
import { Link } from 'react-router-dom';

import './Hero.css';

import womenInwyt from '../assets/womeninwyt.png';
import freshSample from '../assets/freshsample.jpg';
import drySample from '../assets/drysample.png';
import livePlant from '../assets/liveplant.png';
import aromaCandle from '../assets/aromacandle.png';
import fresheners from '../assets/fresheners.png';

const categories = [
  { image: freshSample, label: 'Fresh Flowers', path: '/shop/fresh-flowers' },
  { image: drySample, label: 'Dried Flowers', path: '/shop/dried-flowers' },
  { image: livePlant, label: 'Live Plants', path: '/shop/live-plants' },
  { image: aromaCandle, label: 'Aroma Candles', path: '/shop/aroma-candles' },
  { image: fresheners, label: 'Fresheners', path: '/shop/fresheners' },
];

// Define the layout pattern manually to match your Figma
const layoutPattern = ['text-first', 'image-first', 'text-first', 'image-first', 'text-first'];

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Left Column */}
      <div className="hero-left">
        <h1><strong>Kyiv <br /> LuxeBouquets<sup>®</sup></strong></h1>
        <p className="subheading">
          Discover Uniquely Crafted Bouquets and Gifts for Any Occasion: Spread Joy with Our <i>Online Flower Delivery Service</i>.
        </p>

        <div className="florist-info">
          <img src={womenInwyt} alt="Florist" />
          <p>
            Experience the joy of giving with our modern floral studio. Order online and send fresh flowers, plants and gifts today.
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="hero-right">
        {categories.map((cat, index) => (
          <div key={index} className={`category-pair ${index === 4 ? 'centered' : ''}`}>
            {layoutPattern[index] === 'text-first' ? (
              <>
                <div className="text-card">
                  <h4>{cat.label}</h4>
                  <Link to={cat.path} className="shop-now-btn">Shop now →</Link>
                </div>
                <div className="image-card">
                  <img src={cat.image} alt={cat.label} />
                </div>
              </>
            ) : (
              <>
                <div className="image-card">
                  <img src={cat.image} alt={cat.label} />
                </div>
                <div className="text-card">
                  <h4>{cat.label}</h4>
                  <Link to={cat.path} className="shop-now-btn">Shop now →</Link>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;