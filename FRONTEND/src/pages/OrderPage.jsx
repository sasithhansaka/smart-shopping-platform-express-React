import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./OrderPage.module.css";

import ProductImageGroup from "../components/Order/ProductImageGroup";
import ProductImage from "../components/Order/ProductImage";
import ProductDetails from "../components/Order/ProductDetails";

function OrderPage() {
  const [product, setProduct] = useState(null);
  const [selectIndex, setSelectIndex] = useState("0");

  const PRODUCTID = "67e54c8de8a409dbee00e775";

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

  return (
    <div>
      <h1>Order Page</h1>

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
               productDescription={product.description}/>

          </div>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
