import React from "react";

function Button({ buttonStyle, children, handleClick }) {
  return (
    <button style={buttonStyle} onClick={handleClick}>
      {children}
    </button>
  );
}

export default Button;
