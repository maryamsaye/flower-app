import React from "react";
import NavBar from "./components/NavBar";
import Hero from './components/Hero'; 
import AboutSection from './components/AboutSection'; 
import WhyChooseUs from './components/WhyChooseUs'; 
import ContactUs from './components/ContactUs'; 
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Hero />
      <AboutSection />
      <WhyChooseUs />
      <ContactUs />
    </div>
  );
}

export default App;
