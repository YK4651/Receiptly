import React from "react";
import { Link } from "react-router-dom";

const Button = ({ to, onClick, children, style, ...props }) => {
  const buttonContent = (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        color: "#FFF",
        borderRadius: "5px",
        cursor: "pointer",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );

  if (to) {
    return (
      <Link to={to} style={{ textDecoration: "none" }}>
        {buttonContent}
      </Link>
    );
  }
  return buttonContent;
};

export default Button;