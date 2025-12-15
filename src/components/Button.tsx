interface ButtonProps {
  color: string;
  bgColor: string;
  text: string;
  handleClick: () => void;
}

// type ButtonProps = {
//   color: string;
//   bgColor: string;
//   text: string;
//   handleClick: () => void;
// };

const Button = ({ color, bgColor, text, handleClick }: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      style={{
        color,
        backgroundColor: bgColor,
        padding: "12px 16px",
        border: "none",
        fontSize: "18px",
        cursor: "pointer",
        borderRadius: "6px",
      }}
    >
      {text}
    </button>
  );
};

export default Button;
