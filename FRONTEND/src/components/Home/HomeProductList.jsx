import React from "react";
import ProductCard from "../ProductCard";

import { useQuery } from "@tanstack/react-query";

const HomeProductList = () => {
  const {
    data: products,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/product/");
      return res.json();
    },
  });

  console.log(products);

  return (
    <section className="home-product-list">
      <div></div>
      <div>
        <ProductCard />
      </div>
    </section>
  );
};

export default HomeProductList;
