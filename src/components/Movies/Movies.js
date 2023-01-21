import React, { useContext, useState, useEffect, useCallback } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import { AppContext } from '../../contexts/AppContext';

import './Movies.css';
import Preloader from '../Preloader/Preloader';

export default function Movies({ onMoviesCardLike, onFirstSearch }) {
  const { savedCardList, isSavedCardListReady, cardList, isCardListReady } = useContext(AppContext);

  const [cardListEmptyMessage, setCardListEmptyMessage] = useState({ title: 'Список пуст, начните искать фильмы' });

  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadList = useCallback(() => {
    const query = localStorage.getItem('movie-query');
    const isShortFilm = localStorage.getItem('movie-shortfilm') === 'true' ? true : false;

    if(!query){
      setMovieList([]);
      return;
    }

    const filteredList = cardList.filter(card => {
      return card.nameRU.toLowerCase().includes(query.toLowerCase()) && (isShortFilm ? card.duration <= 40 : true);
    });
    // sets filtered list and adds likes field
    setMovieList(filteredList.map(movie => {
      movie.like = savedCardList.some(c => c.movieId === movie.id);
      return movie;
    }));

    // sets filtered list and adds likes field
    setMovieList(filteredList.map(movie => {
      movie.like = savedCardList.some(c => c.movieId === movie.id);
      return movie;
    }));
  }, [cardList, savedCardList]);

  const loadCachedFilms = useCallback(() => {
    const cachedMovieList = localStorage.getItem('movie-list') && localStorage.getItem('movie-query') ?
      localStorage.getItem('movie-query').trim().length !== 0 ? JSON.parse(localStorage.getItem('movie-list')) : [] :
      [];
    const query = localStorage.getItem('movie-query');
    const isShortFilm = localStorage.getItem('movie-shortfilm') === 'true' ? true : false;

    const filteredList = cachedMovieList.filter(card => {
      return card.nameRU.toLowerCase().includes(query.toLowerCase()) && (isShortFilm ? card.duration <= 40 : true);
    });

    if (isSavedCardListReady) {
      setMovieList(filteredList.map(movie => {
        movie.like = savedCardList.some(c => c.movieId === movie.id);
        return movie;
      }));
    } else {
      setMovieList(filteredList);
    }

  }, [isSavedCardListReady, savedCardList]);

  // on mount
  useEffect(() => {
    const isCacheddMovieList = localStorage.getItem('movie-list') && localStorage.getItem('movie-query');

    if (isCacheddMovieList) {
      loadCachedFilms();
    }
  }, [loadCachedFilms]);

  useEffect(() => {
    if (!isCardListReady || !isSavedCardListReady) {
      return;
    }

    const query = localStorage.getItem('movie-query') || '';
    const isShortFilm = localStorage.getItem('movie-shortfilm') === 'true' ? true : false;

    if(!query){
      setMovieList([]);
      setIsLoading(false);
      return;
    }

    const filteredList = cardList.filter(card => {
      return card.nameRU.toLowerCase().includes(query.toLowerCase()) && (isShortFilm ? card.duration <= 40 : true);
    });
    // sets filtered list and adds likes field
    setMovieList(filteredList.map(movie => {
      movie.like = savedCardList.some(c => c.movieId === movie.id);
      return movie;
    }));

    localStorage.setItem('movie-list', JSON.stringify(filteredList));
    setIsLoading(false);

  }, [isCardListReady, isSavedCardListReady, cardList, savedCardList]);

  function handleSubmit({ query, isShortFilm }) {
    localStorage.setItem('movie-query', query);
    localStorage.setItem('movie-shortfilm', isShortFilm);

    if (query.trim().length === 0) {
      setCardListEmptyMessage({ title: 'Нужно ввести ключевое слово' });
      setMovieList([]);
      return;
    }

    if (!isCardListReady) {
      setIsLoading(true);
      onFirstSearch();
      return;
    }

    loadList();
  }

  function handleFormChange(e) {
    if (e.target.name === 'film') {
      localStorage.setItem('movie-query', e.target.value);
      return;
    }

    if (e.target.name === 'filter_shortfilm') {
      localStorage.setItem('movie-shortfilm', e.target.checked);
      if (isCardListReady) {
        loadList();
      } else {
        if (!e.target.checked) {
          setIsLoading(true);
          onFirstSearch();
        } else {
          loadCachedFilms();
        }
      }
      return;
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
        defaultValues={{
          query: localStorage.getItem('movie-query') || '',
          isShortFilm: localStorage.getItem('movie-shortfilm') === 'true' ? true : false,
        }}
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
