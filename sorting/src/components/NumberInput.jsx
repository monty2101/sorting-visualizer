import React, { useState } from 'react';

function NumberInput() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    let inputValue =  parseInt(event.target.value);
    // Ensure the input value is a number between 1 and 100
    if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= 100) {
      setValue(inputValue);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={1}
        max={100}
        placeholder="Enter a number between 1 and 100"
      />
      <p>Value: {value}</p>
    </div>
  );
}

export default NumberInput;
