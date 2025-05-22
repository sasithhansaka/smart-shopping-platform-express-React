import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./OrderPage.module.css";
import Navbar from "../components/NavBar";

import ProductImageGroup from "../components/Order/ProductImageGroup";
import ProductImage from "../components/Order/ProductImage";
import ProductDetails from "../components/Order/ProductDetails";
import ProductBuyContainer from "../components/Order/ProductBuyContainer";
import Chatbot from "../components/Chatbot/Chatbot";
import ChatButton from "../components/Chatbot/ChatButton";
import GiftBoxSuggestion from "../components/GiftBox/GiftBoxSuggestion";
import TopProducts from "../components/Home/TopProducts";
import Footer from "../components/Footer";

function OrderPage() {
  const [product, setProduct] = useState(null);
  const [selectIndex, setSelectIndex] = useState("0");
  const [chatOpen, setChatOpen] = useState(false);

  const PRODUCTID =
    localStorage.getItem("selectedProductId") ||
    JSON.parse(localStorage.getItem("selectedProduct"))?._id ||
    "682e039fe9196247274e2112";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/product/${PRODUCTID}`,
          { withCredentials: true }
        );
        setProduct(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        const errorMessage = err.response?.data?.message || "An error occurred";
        console.error(errorMessage);
      }
    };

    fetchProduct();
  }, []);

  // useEffect(() => {

  return (
    <div>
      {/* <h1>Order Page</h1> */}
      <Navbar />
      {product && (
        <div className={styles.headerContainer}>
          <div>
            <ProductImageGroup
              images={product.images.slice(0, 3)}
              setSelectIndex={setSelectIndex}
            />
          </div>
          <div>
            <ProductImage image={product.images[selectIndex]} />
          </div>
          <div>
            <ProductDetails
              productName={product.long_title}
              productReviews={product.reviews}
              productColors={product.colors}
              productDescription={product.description}
            />
          </div>
          <div>
            <ProductBuyContainer
              productPrice={product.price}
              productDiscount={product.discountPercentage}
              productStock={product.stock}
              productSellerId={product.sellerId}
              productId={PRODUCTID}
              productmaxBuyCount={product.maxBuyCount}
            />
          </div>
        </div>
      )}
<div style={{marginTop:"140px"}}></div>
      <TopProducts  />
      <Footer />
      <ChatButton onClick={() => setChatOpen(true)} />
      <Chatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <GiftBoxSuggestion />
    </div>
  );
}

export default OrderPage;
