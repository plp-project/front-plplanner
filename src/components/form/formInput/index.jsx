import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './styles.css';

const FormInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col mb-4 field-input">
      <div className="relative">
        <input
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="px-3 py-2 pr-10"
        />
        {type === 'password' && (
          <button 
            type="button" 
            onClick={togglePasswordVisibility} 
           className="absolute inset-y-0 right-0 flex items-center text-gray-600 view-password"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );  
};

export default FormInput;
