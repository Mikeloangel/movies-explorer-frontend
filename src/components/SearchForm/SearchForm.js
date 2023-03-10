import React, { useState } from 'react';

// css
import './SearchForm.css';

// utils
import { getCurrentStorage } from '../../utils/MoviesLocalStorage';

// components
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

// images
import imgSearchIco from '../../images/search-ico.png';

export default function SearchForm({ onSubmit, onChange, useStorageWithDefaults }) {
  const [queryInput, setQueryInput] = useState(useStorageWithDefaults ? getCurrentStorage()[0] : '');
  const [isShortFilm, setIsShortFilm] = useState(useStorageWithDefaults ? getCurrentStorage()[1] : false);

  function handleSubmit(e) {
    e.preventDefault();

    if (typeof onSubmit === 'function') {
      onSubmit({
        query: queryInput,
        isShortFilm,
      });
    }
  }

  function handleInputQueryChange(e) {
    setQueryInput(e.target.value);
    if (typeof onChange === 'function') {
      onChange(e);
    }
  }

  function handleCheckedChange(e) {
    setIsShortFilm(!isShortFilm);
    if (typeof onChange === 'function') {
      onChange(e);
    }
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

        <FilterCheckbox
          label='Короткометражки'
          isDisabled={false}
          checked={isShortFilm}
          onChange={handleCheckedChange}
          id='shortfilm'
        />

      </form>
    </section>
  )
}
