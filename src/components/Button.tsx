interface InputProps {
  text: string;
  type: any;
}

const Button: React.FC<InputProps> = ({ text, type }) => {
  return (
    <button type={type} className="p-1 w-full h-full">
      {text}
    </button>
  );
};

export default Button;
