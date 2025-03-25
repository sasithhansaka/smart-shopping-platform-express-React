import React from "react";
import NavBar from "../components/NavBar";
import CategoryBoxContainer from "../components/Home/CategoryBoxContainer";

function HomePage() {
  return (
    <main>
      <NavBar />
      <div className="home-banner"></div>
      <CategoryBoxContainer />
    </main>
  );
}

export default HomePage;
