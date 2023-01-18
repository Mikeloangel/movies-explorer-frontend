import React, { useState } from 'react';

import './FilterCheckbox.css';

export default function FilterCheckbox({ label, id = 'def', isDisabled, onChange, checked }) {

  return (
    <div className='filterbox'>
      <label
        htmlFor={`filter_${id}`}
        className='filterbox__label'
      >
        <input
          type='checkbox'
          id={`filter_${id}`}
          name={`filter_${id}`}
          className='filterbox__check'
          defaultChecked={checked}
          onChange={onChange}
          disabled={isDisabled}
        />
        <span
          className='filterbox__background'
          role='checkbox'
          aria-checked={checked}
          aria-labelledby={`filter_${id}`}
        >
          <span className='filterbox__eyeball'></span>
          <span className='filterbox__eyeball'></span>
        </span>
        <span className='filterbox__text'>{label}</span>
      </label>
    </div>
  )
}
