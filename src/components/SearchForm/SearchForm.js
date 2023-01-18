import React, { useRef, useState, useEffect } from 'react';

import './SearchForm.css';

import imgSearchIco from '../../images/search-ico.png';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({ onSubmit, defaultValues= {} }) {
  const [queryInput, setQueryInput] = useState('');
  const [isShortFilm, setIsShortFilm] = useState(false);

  useEffect(() => {
    setQueryInput(defaultValues.query ?? '');
  }, [defaultValues])

  function handleCheckboxChange(isChecked) {
    setIsShortFilm(isChecked);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      query: queryInput,
      isShortFilm,
    });
  }

  function handleInputQueryChange(e) {
    setQueryInput(e.target.value);
  }

  return (
    <section className='search' aria-label='Поиск любимых фильмов'>
      <form name='search-form' className='search__form' noValidate onSubmit={handleSubmit}>
        <div className='search__form-wrapper'>
          <img
            src={imgSearchIco}
            alt='Ищите и найдете кино'
            width='34'
            height='34'
            className='search__ico'
          />

          <input
            type='text'
            name='film'
            className='search__input'
            required
            placeholder='Фильм'
            value={queryInput}
            onChange={handleInputQueryChange}
          />

          <button
            type='submit'
            className='search__submit'
          >
          </button>
        </div>

        <FilterCheckbox label='Короткометражки' isDisabled={false} onChange={handleCheckboxChange} />
      </form>
    </section>
  )
}
