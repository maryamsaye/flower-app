// src/pages/Home.js
import React from "react";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import WhyChooseUs from "../components/WhyChooseUs";
import ContactUs from "../components/ContactUs";
import Service from "../components/Service";
import Review from "../components/Review";
import LeftColumn from "../components/LeftColumn";

const Home = () => {
return (
    <>
    <LeftColumn />
    <Hero />
    <AboutSection />
    <WhyChooseUs />
    <ContactUs />
    <Service />
    <Review />
    </>
);
};

export default Home;
