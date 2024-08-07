import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  OnChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  Value?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  OnChange,
  Value,
}) => {
  return (
    <>
      {type !== "textarea" && type !== "select" ? (
        <input
          type={type}
          placeholder={placeholder}
          value={Value}
          required
          className="w-full h-full outline-none"
          onChange={OnChange}
        />
      ) : type !== "select" ? (
        <textarea
          className="w-full h-full resize-none outline-none"
          onChange={OnChange}
          placeholder={placeholder}
          required
          value={Value}
        ></textarea>
      ) : (
        <select>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      )}
    </>
  );
};

export default Input;
