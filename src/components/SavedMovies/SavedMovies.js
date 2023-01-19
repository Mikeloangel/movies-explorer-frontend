import React, { useContext, useState, useEffect } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import { AppContext } from '../../contexts/AppContext';

import './SavedMovies.css';

export default function SavedMovies({ onMoviesCardLike }) {
  const { savedCardList } = useContext(AppContext);

  const [filteredCardList, setFilteredCardList] = useState([]);

  function handleSavedMovieCardLike(card) {
    if (typeof onMoviesCardLike === 'function') {
      onMoviesCardLike(card);
    };
  }

  useEffect(() => {
    setFilteredCardList(savedCardList);
  }, [savedCardList])

  const emptyMessageSettings = {
    title: 'Вы пока не полюбили ни одного фильма',
    redirect: '/movies',
    redirectTitle: 'Полюбить фильмы можно тут'
  }

  const moviesFieldsSettings = {
    id: 'movieId',
    baseUrl: '',
    mainImgPath: 'image',
    imgFormats: {
      'thumbnail': 'thumbnail',
    }
  }

  function handleSubmit({ query, isShortFilm }) {
    setFilteredCardList(() => {
      return savedCardList.filter(card => {
        return card.nameRU.toLowerCase().includes(query.toLowerCase())
      });
    })
  }

  return (
    <main className='saved-movies'>
      <SearchForm
        onSubmit={handleSubmit}
      />

      <MoviesCardList
        cardList={filteredCardList}
        emptyMessageSettings={emptyMessageSettings}
        onCardLikeClick={handleSavedMovieCardLike}
        theme='saved'
        pagenation={false}
        cardListFields={moviesFieldsSettings}
      />
    </main>
  )
}
