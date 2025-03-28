import React from "react";

import style from "./ProductImageGroup.module.css";
function ProductImageGroup({ images ,setSelectIndex}) {
  
  return (

    <div className={style.productImageGroup}>
      {images.map((image, index) => (
        <img key={index} src={image} 
        onClick={()=>setSelectIndex(index)}
         />
      ))}
    </div>
  );
}

export default ProductImageGroup;
