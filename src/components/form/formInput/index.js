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
    <div className="form-group d-flex flex-column">
      <label className="form-label">{label}</label>
      <div className="position-relative form-input">
        {type === 'password' && (
          <i onClick={togglePasswordVisibility} className="view-password">
            {showPassword ? (
              <FaEyeSlash color="#fff" />
            ) : (
              <FaEye color="#fff" />
            )}
          </i>
        )}
        <input
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default FormInput;