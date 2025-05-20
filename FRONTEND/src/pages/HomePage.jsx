import React from "react";
import NavBar from "../components/NavBar";
import CategoryBoxContainer from "../components/Home/CategoryBoxContainer";
import HomeProductList from "../components/Home/HomeProductList";
import Chatbot from "../components/Chatbot/Chatbot";
import ChatButton from "../components/Chatbot/ChatButton";
import { useState } from "react";
import GiftBoxSuggestion from "../components/GiftBox/GiftBoxSuggestion";
function HomePage() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <main>
      {/* <NavBar />
      <div className="home-banner"></div>
      <CategoryBoxContainer />
      <HomeProductList /> */}
      <ChatButton onClick={() => setChatOpen(true)} />
      <Chatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
        <GiftBoxSuggestion />
                  {/* <img src="./src/images/Logo-White.png" /> */}

    </main>
  );
}

export default HomePage;
