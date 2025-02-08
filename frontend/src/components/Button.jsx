const Button = ({ onClick, children, style, ...props }) => {
  return (
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
};

export default Button;