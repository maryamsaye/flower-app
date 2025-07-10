import React from 'react';
import { Link } from 'react-router-dom';

import './AboutSection.css';

const AboutSection = () => {
return (
    <div className="section">
    <section className="about-section">
      {/* Left Column */}
        <div className="about-left">
        <h2>About us</h2>
        </div>

    <div className="about-right">
  <div className="about-text">
    <h3>OUR STORY</h3>
    <h2>Kyiv LuxeBouquets</h2>
    <p>
      Kyiv LuxeBouquets is a modern floral studio offering unique floral arrangements
      and thoughtful gifts curated by passionate florists. We work with fresh flowers
      to craft meaningful bouquets and provide same-day delivery throughout the city.
      Celebrate moments, express emotions, and spread joy through the art of flowers.
    </p>
  </div>
  <Link to="/AboutPage">
    <button>LEARN MORE</button>
  </Link>
</div>



    </section>
    </div>
    );
};

export default AboutSection;