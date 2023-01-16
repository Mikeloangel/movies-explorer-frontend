import React, { useContext } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import { AppContext } from '../../contexts/AppContext';

import './SavedMovies.css';

export default function SavedMovies({onMoviesCardLike}) {
  const { cardList } = useContext(AppContext);

  // const filteredList useMemo()
  const filteredList = cardList.filter((e) => e.like);

  const emptyMessageSettings = {
    title: 'Вы пока не полюбили ни одного фильма',
    redirect: '/movies',
    redirectTitle: 'Полюбить фильмы можно тут'
  }

  return (
    <main className='saved-movies'>
      <SearchForm />

      <MoviesCardList
        cardList={filteredList}
        emptyMessageSettings={emptyMessageSettings}
        onCardLikeClick={onMoviesCardLike}
        theme='saved'
        pagenation={false}
      />
    </main>
  )
}
