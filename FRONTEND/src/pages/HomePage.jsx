import Chatbot from "../components/Chatbot/Chatbot";
import ChatButton from "../components/Chatbot/ChatButton";
import { useState } from "react";
import GiftBoxSuggestion from "../components/GiftBox/GiftBoxSuggestion";
import styles from "./HomePage.module.css";
import Navbar from "../components/NavBar";
import HeroSection from "../components/Home/HeroSection";
import ProductContainer from "../components/Home/ProductContainer";
// import Banner from "../components/Home/Banner";
import Footer from "../components/Footer";
import TopProducts from "../components/Home/TopProducts";
function HomePage() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <ProductContainer />
      <img
        src="./src/images/image.png"
        alt="Apple"
        className={styles.appleImage}
      />
      {/* <Banner /> */}
      <TopProducts />
      <Footer />
      <ChatButton onClick={() => setChatOpen(true)} />
      <Chatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <GiftBoxSuggestion />
    </div>
  );
}

export default HomePage;
