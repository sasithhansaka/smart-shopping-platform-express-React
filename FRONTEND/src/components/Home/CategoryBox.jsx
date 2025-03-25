import React from "react";

function CategoryBox({ label1, label2, image, box_width, color, children }) {
  return (
    <div
      className="category-box"
      style={{ width: box_width, background: color }}
    >
      <span>{label1}</span>
      <span>{label2}</span>
      {children}
      <img src={image} />
    </div>
  );
}

export default CategoryBox;
