import React, { useContext } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import { AppContext } from '../../contexts/AppContext';

import './Movies.css';

export default function Movies({ onMoviesCardLike }) {
  const { cardList } = useContext(AppContext);


  function handleCardLikeClick(id) {
    if (typeof onMoviesCardLike === 'function') {
      onMoviesCardLike(id);
    }
  }

  return (
    <main className='movies'>
      <SearchForm />

      <MoviesCardList
        cardList={cardList}
        onCardLikeClick={handleCardLikeClick}
      />
    </main>
  )
}
