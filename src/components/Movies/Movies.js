import React, { useContext, useState, useEffect, useCallback } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import { AppContext } from '../../contexts/AppContext';
import { MoviesApi } from '../../utils/MoviesApi';

import './Movies.css';
import Preloader from '../Preloader/Preloader';

export default function Movies({ onMoviesCardLike }) {
  const { savedCardList, isSavedCardListReady } = useContext(AppContext);

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

  const loadList = useCallback((query, isShortFilm) => {
    if (!query) {
      return;
    }

    setIsLoading(true);
    MoviesApi()
      .then(data => {
        const filteredList = data.filter(card => {
          return card.nameRU.toLowerCase().includes(query.toLowerCase()) && (isShortFilm ? card.duration <= 40 : true);
        });
        // sets filtered list and adds likes field
        setMovieList(filteredList.map(movie => {
          movie.like = savedCardList.some(c => c.movieId === movie.id);
          return movie;
        }));
        setCardListEmptyMessage({ title: 'Ничего не найдено' });
        localStorage.setItem('movie-list', JSON.stringify(filteredList));
      })
      .catch(() => {
        setCardListEmptyMessage({
          title: `Во время запроса произошла ошибка.Возможно, проблема с соединением или сервер недоступен.
        Подождите немного и попробуйте ещё раз`});

      })
      .finally(() => {
        setIsLoading(false);
        localStorage.setItem('movie-query', query);
        localStorage.setItem('movie-shortfilm', isShortFilm);
      });
  }, [savedCardList]);


  useEffect(() => {
    loadList(localStorage.getItem('movie-query') || null, localStorage.getItem('movie-shortfilm') === 'true' ? true : false);
  }, [isSavedCardListReady])

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

    if (e.target.name === 'filter_shortfilm') {
      localStorage.setItem('movie-shortfilm', e.target.checked);
      loadList(localStorage.getItem('movie-query') || '', e.target.checked);
    }
  }

  function handleCardLikeClick(card) {
    if (typeof onMoviesCardLike === 'function') {
      onMoviesCardLike(card, (id, isLiked) => {
        setMovieList(prev => prev.map(movie => {
          movie.id === id && (movie.like = isLiked);
          return movie;
        }));
      });
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
