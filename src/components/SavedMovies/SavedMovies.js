import React, { useContext, useState, useEffect, useCallback, useMemo } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import { AppContext } from '../../contexts/AppContext';

import './SavedMovies.css';
import Preloader from '../Preloader/Preloader';

export default function SavedMovies({ onMoviesCardLike }) {
  const { savedCardList, isSavedCardListReady } = useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchIsShort, setIsShort] = useState(false);
  const [filteredCardList, setFilteredCardList] = useState([]);
  const [isInFilteringProcess, setIsInFilteringProcess] = useState(true);

  const loadList = useCallback((query, isShortFilm) => {
    setSearchQuery(query);
    setIsShort(isShortFilm)
    setIsInFilteringProcess(true);

    setFilteredCardList(() => {
      return savedCardList.filter(card =>
        card.nameRU.toLowerCase().includes(query.toLowerCase()) &&
        (isShortFilm ? card.duration <= 40 : true)
      );
    })

    setIsInFilteringProcess(false);
  }, [savedCardList]);

  useEffect(() => {
    if (isSavedCardListReady) {
      setFilteredCardList(savedCardList);
      setIsInFilteringProcess(false);
      loadList(searchQuery, searchIsShort);
    }
  }, [savedCardList, isSavedCardListReady, loadList, searchIsShort, searchQuery])

  function handleSubmit({ query, isShortFilm }) {
    loadList(query, isShortFilm);
  }

  function handleFormChange(e) {
    if (e.target.name === 'filter_shortfilm') {
      setIsShort(e.target.checked);
    }
  }

  function handleSavedMovieCardLike(card) {
    if (typeof onMoviesCardLike === 'function') {
      onMoviesCardLike(card);
    };
  }

  const defaultFormValues = {
    query: '',
    isShortFilm: false,
  };

  const moviesFieldsSettings = {
    id: 'movieId',
    baseUrl: '',
    mainImgPath: 'image',
    imgFormats: {
      'thumbnail': 'thumbnail',
    }
  }

  const emptyMessageSettings = useMemo(() => {
    const title = savedCardList.length === 0 ?
      'Вы пока не полюбили ни одного фильма' :
      'Ничего не найдено';

    const redirect = savedCardList.length === 0 ?
      '/movies' : undefined;

    const redirectTitle = 'Полюбить фильмы можно тут'

    return { title, redirect, redirectTitle }
  }, [savedCardList]);

  return (
    <main className='saved-movies'>
      <SearchForm
        onSubmit={handleSubmit}
        defaultValues={defaultFormValues}
        onChange={handleFormChange}
      />

      {isInFilteringProcess || !isSavedCardListReady ?
        (<Preloader />) :
        (
          <MoviesCardList
            cardList={filteredCardList}
            emptyMessageSettings={emptyMessageSettings}
            onCardLikeClick={handleSavedMovieCardLike}
            theme='saved'
            pagenation={false}
            cardListFields={moviesFieldsSettings}
          />
        )
      }
    </main>
  )
}
