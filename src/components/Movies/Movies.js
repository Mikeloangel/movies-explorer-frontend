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
  const [cardList, setCardList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultFormValues, setDefaultFormValues] = useState({ query: 'п', isShortFilm: true });

  function handleCardLikeClick(id) {
    if (typeof onMoviesCardLike === 'function') {
      onMoviesCardLike(id);
    }
  }

  const loadList = useCallback((query) => {
    setIsLoading(true);
    MoviesApi()
      .then(data => {
        const filteredList = data.filter(card => {
          // console.log(card.nameRU.toLowerCase());
          // console.log(query.toLowerCase());
          // console.log(query);
          // console.log(card.nameRU.toLowerCase().includes(query.toLowerCase()));
          return card.nameRU.toLowerCase().includes(query.toLowerCase())
        });
        // setCardList(prev => filteredList);
        setCardList(filteredList);
        // console.log(filteredList)
        setCardListEmptyMessage({ title: 'Ничего не найдено' });
        localStorage.setItem('movie-list', filteredList)
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

    loadList(query);

    localStorage.setItem('movie-query', query);
    localStorage.setItem('movie-shortfilm', isShortFilm);
  }

  return (
    <main className='movies'>
      <SearchForm
        onSubmit={handleSubmit}
        defaultValues={defaultFormValues}
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
