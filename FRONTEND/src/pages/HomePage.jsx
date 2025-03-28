import React from "react";
import NavBar from "../components/NavBar";
import CategoryBoxContainer from "../components/Home/CategoryBoxContainer";
import HomeProductList from "../components/Home/HomeProductList";

function HomePage() {
  return (
    <main>
      <NavBar />
      <div className="home-banner"></div>
      <CategoryBoxContainer />
      <HomeProductList />
    </main>
  );
}

export default HomePage;
