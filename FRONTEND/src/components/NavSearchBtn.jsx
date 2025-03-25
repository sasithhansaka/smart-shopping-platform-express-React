import React from "react";

const btnClick = () => {
  console.log("clicked");
};

const NavSearchBtn = () => {
  return <button onClick={btnClick}>Search</button>;
};

export default NavSearchBtn;
