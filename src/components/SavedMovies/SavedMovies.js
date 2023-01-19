import React, { useContext } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import { AppContext } from '../../contexts/AppContext';

import './SavedMovies.css';

export default function SavedMovies({ onMoviesCardLike }) {
  const { savedCardList } = useContext(AppContext);

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

  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList
        cardList={savedCardList}
        emptyMessageSettings={emptyMessageSettings}
        onCardLikeClick={onMoviesCardLike}
        theme='saved'
        pagenation={false}
        cardListFields={moviesFieldsSettings}
      />
    </main>
  )
}
