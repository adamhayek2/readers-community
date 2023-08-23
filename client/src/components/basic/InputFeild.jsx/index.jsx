import React from 'react';

const InputField = ({ className, type, placeholder, value, onChange }) => {
  return (
    <input
      className= {className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;