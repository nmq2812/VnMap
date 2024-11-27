import React from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero.jsx";
import Service from "../components/Route/Service/Service.jsx";
import FastService from "../components/Route/FastService/FastService.jsx";
import Partner from "../components/Route/Partner/Partner.jsx";
import Footer from "../components/Layout/Footer.jsx";
const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Service />
      <FastService />
      <Partner />
      <Footer />
    </div>
  );
};

export default HomePage;
