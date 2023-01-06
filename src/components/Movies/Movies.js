import React from 'react';
import SearchForm from '../SearchForm/SearchForm';

import './Movies.css';

export default function Movies() {
  return (
    <main className='movies'>
      <SearchForm />
      <div style={{
        width: '100%',
        borderTop: '1px solid black'
      }}>
        List of movies
      </div>
    </main>
  )
}

/**
 * SearchForm — форма поиска, куда пользователь будет вводить запрос.
    *  Обратите внимание на фильтр с чекбоксом «Только короткометражки».
    *  Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
    *
Preloader — отвечает за работу прелоадера.
MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
MoviesCard — компонент одной карточки фильма.
 */