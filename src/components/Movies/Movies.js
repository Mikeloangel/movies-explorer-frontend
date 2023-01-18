import React, { useContext, useState, useEffect, useCallback } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

// import { AppContext } from '../../contexts/AppContext';
import { MoviesApi } from '../../utils/MoviesApi';

import './Movies.css';
import Preloader from '../Preloader/Preloader';

export default function Movies({ onMoviesCardLike }) {
  // const { cardList } = useContext(AppContext);
  const [cardListEmptyMessage, setCardListEmptyMessage] = useState({ title: 'Список пуст, начните искать фильмы' });
  const [cardList, setCardList] = useState(
    localStorage.getItem('movie-list') && localStorage.getItem('movie-query') ?
    localStorage.getItem('movie-query').trim().length !==0 ? JSON.parse(localStorage.getItem('movie-list')) : [] :
      []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [defaultFormValues, setDefaultFormValues] = useState({
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
        setCardList(filteredList);
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
      })
  }, []);

  function handleSubmit({ query, isShortFilm }) {
    if (query.trim().length === 0) {
      setCardListEmptyMessage({ title: 'Нужно ввести ключевое слово' });
      setCardList([]);
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
          cardList={cardList}
          onCardLikeClick={handleCardLikeClick}
          emptyMessageSettings={cardListEmptyMessage}
          pagenation={true}
        />)
      }

    </main>
  )
}
