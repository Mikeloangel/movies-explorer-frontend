import React from 'react';

import './SearchForm.css';

import imgSearchIco from '../../images/search-ico.png';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm() {
  function handleCheckboxChange(isChecked) {
    console.log(isChecked);
  }

  return (
    <section className='search'>
      <form name='search-form' className='search__form' noValidate>
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

/**
 * SearchForm — форма поиска, куда пользователь будет вводить запрос.
    *  Обратите внимание на фильтр с чекбоксом «Только короткометражки».
    *  Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
    * */