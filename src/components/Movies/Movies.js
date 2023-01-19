import React, { useContext, useState, useEffect, useCallback } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import { AppContext } from '../../contexts/AppContext';
import { MoviesApi } from '../../utils/MoviesApi';


import './Movies.css';
import Preloader from '../Preloader/Preloader';

export default function Movies({ onMoviesCardLike }) {
  const { savedCardList } = useContext(AppContext);
  const [cardListEmptyMessage, setCardListEmptyMessage] = useState({ title: 'Список пуст, начните искать фильмы' });
  const [movieList, setMovieList] = useState(
    localStorage.getItem('movie-list') && localStorage.getItem('movie-query') ?
      localStorage.getItem('movie-query').trim().length !== 0 ? JSON.parse(localStorage.getItem('movie-list')) : [] :
      []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [defaultFormValues] = useState({
    query: localStorage.getItem('movie-query') || '',
    isShortFilm: localStorage.getItem('movie-shortfilm') === 'true' ? true : false,
  });

  function handleCardLikeClick(id) {
    if (typeof onMoviesCardLike === 'function') {
      onMoviesCardLike(id);
    }
  }

  const loadList = useCallback((query, isShortFilm) => {
    setIsLoading(true);
    MoviesApi()
      .then(data => {
        const filteredList = data.filter(card => {
          return card.nameRU.toLowerCase().includes(query.toLowerCase())
        });
        // sets filtered list and adds likes field
        setMovieList(filteredList.map(movie => {
          movie.like = savedCardList.some(c => c.movieId === movie.id);
          return movie;
        }));
        setCardListEmptyMessage({ title: 'Ничего не найдено' });
        localStorage.setItem('movie-list', JSON.stringify(filteredList));
      })
      .catch(errMsg => {
        setCardListEmptyMessage({
          title: `Во время запроса произошла ошибка.Возможно, проблема с соединением или сервер недоступен.
        Подождите немного и попробуйте ещё раз`});

      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [savedCardList]);

  function handleSubmit({ query, isShortFilm }) {
    if (query.trim().length === 0) {
      setCardListEmptyMessage({ title: 'Нужно ввести ключевое слово' });
      setMovieList([]);
      return;
    }

    loadList(query, isShortFilm);
  }

  function handleFormChange(e) {
    if (e.target.name === 'film') {
      localStorage.setItem('movie-query', e.target.value);
      return;
    }

    if (e.target.name === 'filter_def') {
      localStorage.setItem('movie-shortfilm', e.target.checked);
    }
  }

  const moviesFieldsSettings = {
    id: 'id',
    baseUrl: 'https://api.nomoreparties.co',
    mainImgPath: 'image.url',
    imgFormats: {
      'thumbnail': 'image.formats.thumbnail.url',
      'large': 'image.formats.large.url',
      'medium': 'image.formats.medium.url',
      'small': 'image.formats.small.url',
    },
  }

  return (
    <main className='movies'>
      <SearchForm
        onSubmit={handleSubmit}
        defaultValues={defaultFormValues}
        onChange={handleFormChange}
      />
      {isLoading ?
        (<Preloader />) :
        (<MoviesCardList
          cardList={movieList}
          onCardLikeClick={handleCardLikeClick}
          emptyMessageSettings={cardListEmptyMessage}
          pagenation={true}
          cardListFields={moviesFieldsSettings}
        />)
      }

    </main>
  )
}
