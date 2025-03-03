import React from "react";

const Button = ({ onClick, children, style, ...props }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        // backgroundColor: "#007BFF",
        color: "#FFF",
        // border: "1px solid #007BFF",
        borderRadius: "5px",
        cursor: "pointer",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;