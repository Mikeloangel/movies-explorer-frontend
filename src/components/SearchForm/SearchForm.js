import React from 'react';

import './SearchForm.css';

import imgSearchIco from '../../images/search-ico.png';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({onSubmit}) {
  function handleCheckboxChange(isChecked) {
    console.log(isChecked);
  }

  return (
    <section className='search' aria-label='Поиск любимых фильмов'>
      <form name='search-form' className='search__form' noValidate onSubmit={onSubmit}>
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
