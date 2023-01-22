import React, { useContext, useState, useEffect, useCallback } from 'react';

// Components
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

// Utils
import { AppContext } from '../../contexts/AppContext';

import {
  getCurrentStorage,
  setCurrentStorage,
  getListFromStorage,
  setListToStorage,
  checkIsListInStorage,
} from '../../utils/MoviesLocalStorage';

import { CARD_MAIN_IMG_BASE_URL } from '../../utils/variables';

// CSS
import './Movies.css';

export default function Movies({ onMoviesCardLike, onFirstSearch }) {
  const { savedCardList, isSavedCardListReady, cardList, isCardListReady } = useContext(AppContext);

  const [cardListEmptyMessage, setCardListEmptyMessage] = useState({ title: 'Список пуст, начните искать фильмы' });

  const [outputList, setOutputList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // sets current view with empty card list to show message
  const clearView = useCallback(() => {
    setOutputList([]);
    setIsLoading(false);
    setListToStorage([]);
  }, []);

  // main filtering logic is here accepts
  // {list} it can be be cached list or context list
  const filterOutputList = useCallback((list) => {
    const [query, isShortFilm] = getCurrentStorage();

    if (!query) {
      return;
    }

    let newList = list.filter(card => {
      return card.nameRU.toLowerCase().includes(query.toLowerCase()) && (isShortFilm ? card.duration <= 40 : true);
    }).map(movie => {
      movie.like = savedCardList.some(c => c.movieId === movie.id);
      return movie;
    });
    setOutputList(newList);
    setListToStorage(newList);

    return newList;
  }, [savedCardList]);

  const loadList = useCallback(() => {
    const [query] = getCurrentStorage();

    if (!query) {
      clearView();
      return;
    }

    filterOutputList(cardList);
  }, [cardList, clearView, filterOutputList]);

  const loadCachedList = useCallback(() => {
    const cachedMovieList = getListFromStorage();
    filterOutputList(cachedMovieList);
  }, [filterOutputList]);

  // on mount show cached list
  useEffect(() => {
    if (checkIsListInStorage()) {
      loadCachedList();
    }
  }, [loadCachedList]);

  // when lists are ready use cardList from context
  useEffect(() => {
    if (!isCardListReady || !isSavedCardListReady) {
      return;
    }

    const [query] = getCurrentStorage();

    if (!query) {
      clearView();
      return;
    }

    const filteredList = filterOutputList(cardList);
    setListToStorage(filteredList);
    setIsLoading(false);

  }, [cardList, clearView, filterOutputList, isCardListReady, isSavedCardListReady]);

  function handleSubmit({ query, isShortFilm }) {
    setCurrentStorage(query, isShortFilm);

    if (query.trim().length === 0) {
      setCardListEmptyMessage({ title: 'Нужно ввести ключевое слово' });
      clearView();
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
      setCurrentStorage((query, isShortFilm) => [e.target.value, isShortFilm]);
      return;
    }

    if (e.target.name === 'filter_shortfilm') {
      setCurrentStorage((query) => [query, e.target.checked]);
      if (isCardListReady) {
        loadList();
      } else {
        if (!e.target.checked) {
          setIsLoading(true);
          onFirstSearch();
        } else {
          loadCachedList();
        }
      }
      return;
    }
  }

  function handleCardLikeClick(card) {
    if (typeof onMoviesCardLike === 'function') {
      onMoviesCardLike(card, (id, isLiked) => {
        setOutputList(prev => prev.map(movie => {
          movie.id === id && (movie.like = isLiked);
          return movie;
        }));
      });
    }
  }

  const moviesFieldsSettings = {
    id: 'id',
    baseUrl: CARD_MAIN_IMG_BASE_URL,
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
        useStorageWithDefaults={true}
        onChange={handleFormChange}
      />

      {isLoading ?
        (<Preloader />) :
        (<MoviesCardList
          cardList={outputList}
          onCardLikeClick={handleCardLikeClick}
          emptyMessageSettings={cardListEmptyMessage}
          pagenation={true}
          cardListFields={moviesFieldsSettings}
        />)
      }

    </main>
  )
}
