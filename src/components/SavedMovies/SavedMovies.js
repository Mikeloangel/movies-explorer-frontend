import React from 'react';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';

export default function SavedMovies() {
  return (
    <main className='saved-movies'>
      <SearchForm />
      <div style={{
        width:'100%',
        borderTop:'1px solid black'
        }}>
        Saved movies
      </div>
    </main>
  )
}

/**
 * MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
MoviesCard — компонент одной карточки фильма.
 */