import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
// import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <main style={{ backgroundColor: "#f3f4f6" }}>
      <Hero />
      <Categories />
      <NewArrival />
      <PromoBanner />
      {/* <BestSeller /> */}
      {/* <Testimonials /> */}
    </main>
  );
};

export default Home;
