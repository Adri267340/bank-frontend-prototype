import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = true,
}) => {
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputField;
