import React from "react";

interface ButtonPrimaryProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  text,
  onClick,
  disabled = false,
  type = "submit",
}) => {
  return (
    <button
      className="primary-btn"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

export default ButtonPrimary;
