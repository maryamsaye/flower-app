// src/pages/Home.js
import React from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import WhyChooseUs from "../components/WhyChooseUs";
import ContactUs from "../components/ContactUs";
import Service from "../components/Service";
import Review from "../components/Review";
import Footer from "../components/Footer";
import LeftColumn from "../components/LeftColumn";

const Home = () => {
return (
    <>
    <NavBar />
    <LeftColumn />
    <Hero />
    <AboutSection />
    <WhyChooseUs />
    <ContactUs />
    <Service />
    <Review />
    <Footer />
    </>
);
};

export default Home;
