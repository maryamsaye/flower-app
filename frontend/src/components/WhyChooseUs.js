import React from 'react';
import './WhyChooseUs.css';

const features = [
  {
    title: 'Stylish bouquets by florists',
    description: 'At our floral studio, our professional florists craft the most elegant and stylish bouquets using only the freshest and highest quality materials available. We stay up-to-date with the latest floral design trends and offer unique arrangements that are sure to impress. Let us brighten up your day with our stunning bouquets and same-day delivery service..',
  },
  {
    title: 'On-time delivery',
    description: 'Never miss a moment with our on-time flower delivery service. Our couriers will deliver your bouquet personally, without boxes, to ensure it arrives in perfect condition. Trust us to deliver your thoughtful gift reliably..',
  },
  {
    title: 'Safe payment',
    description: 'You can feel secure when placing an order with us, as we use industry-standard security measures to protect your payment information. Your transaction will be safe and hassle-free, so you can shop with confidence..',
  },
  {
    title: 'Subscription by your needs',
    description: 'With our subscription service tailored to your specific needs, you can enjoy the convenience of having beautiful bouquets delivered straight to your door at regular intervals. Our flexible service is perfect for busy individuals or those who want to ensure they always have fresh flowers on hand. You will save time and money with this hassle-free solution to your floral needs..',
  },
];

const WhyChooseUs = () => {
  return (
    
    <section className="us-section">
      {/* Left Column */}
      <div className="us-left">
        <h2>WHY CHOOSE US?</h2>
      </div>

      {/* Right Column */}
      <div className="us-right">
        {features.map((item, idx) => (
          <div key={idx} className="us-content">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;