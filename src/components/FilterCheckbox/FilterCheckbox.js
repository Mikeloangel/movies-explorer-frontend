import React, { useState } from 'react';

import './FilterCheckbox.css';

export default function FilterCheckbox({ label, id = 'def', isDisabled, onChange }) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheck() {
    setIsChecked((prev) => {
      if (typeof onChange === 'function') onChange(!prev);
      return !prev
    });
  }

  return (
    <div className='filterbox'>
      <input
        type='checkbox'
        id={`filter_${id}`}
        name={`filter_${id}`}
        className='filterbox__check'
        value={isChecked}
        onChange={handleCheck}
        disabled={isDisabled}
      />

      <label
        htmlFor={`filter_${id}`}
        className='filterbox__label'
      >
        <div
          className='filterbox__background'
          role='checkbox'
          aria-checked={isChecked}
          aria-labelledby={`filter_${id}`}
        >
          <div className='filterbox__eyeball'></div>
        </div>
        {label}
      </label>
    </div>
  )
}
