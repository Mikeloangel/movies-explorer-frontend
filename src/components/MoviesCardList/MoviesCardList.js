import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';

// import { AppContext } from '../../contexts/AppContext';

import './MoviesCardList.css';
import { Link } from 'react-router-dom';

/**
 *
 * @param {cardList} array with film records
 * @param {emptyMessageSettings} object with empty message settings
 *  title - title to show when list is empty
 *  redirect - url to place in link
 *  redirectTitle - link title
 * @returns JSX
 */

export default function MoviesCardList({ cardList, emptyMessageSettings, onCardLikeClick, theme, pagenation }) {
  function handleCardLikeClick(id) {
    if (typeof onCardLikeClick === 'function') {
      onCardLikeClick(id);
    }
  }

  const gridElementRef = useRef();

  const [page, setPage] = useState(1);
  const [numberOfColumns, setNumberOfColumns] = useState(-1);

  useEffect(() => {
    if (!gridElementRef.current) {
      return;
    }

    function calcColumns() {
      const gridComputedStyle = window.getComputedStyle(gridElementRef.current);
      const nCols = gridComputedStyle
        .getPropertyValue('grid-template-columns')
        .replace(' 0px', '')
        .split(' ')
        .length;

      setNumberOfColumns(prevNCols => {
        return nCols;
      });
    }

    calcColumns();

    window.addEventListener('resize', calcColumns);
    return () => {
      window.removeEventListener('resize', calcColumns);
    };
  }, [numberOfColumns, gridElementRef]);

  const loadByNElements = useMemo(() => numberOfColumns > 1 ? numberOfColumns : 5, [numberOfColumns]);
  const initialNElements = useMemo(() => numberOfColumns >= 3 ? 12 : numberOfColumns === 2 ? 8 : 5, [numberOfColumns]);
  const sliceLimiter = useMemo(() => page === 1 ? initialNElements : initialNElements + (page - 1) * loadByNElements, [page, initialNElements, loadByNElements]);

  const outputList = useMemo(() =>
    pagenation ?
      cardList.slice(0, page * numberOfColumns >= cardList.length ? cardList.length : sliceLimiter) :
      cardList.slice()
    , [page, cardList, pagenation, numberOfColumns, sliceLimiter]);


  function handleNextPage() {
    setPage(ppage => ++ppage);
  }

  const isShowMore = pagenation && sliceLimiter < cardList.length;

  return (
    <section className='cardlist' aria-label='Список фильмов'>
      {
        outputList.length === 0 ? (
          <section className='cardlist__empty' aria-label='Это все фильмы'>
            <h2 className='cardlist__empty-title'>{emptyMessageSettings?.title || 'Список пуст'}</h2>
            {
              emptyMessageSettings?.redirect && (
                <Link to={emptyMessageSettings?.redirect || '/'} className='cardlist__empty-link'>
                  {emptyMessageSettings?.redirectTitle || 'Попрбовать сначала'}
                </Link>
              )
            }
          </section>
        ) : (
          <ul className='cardlist__list' ref={gridElementRef}>
            {outputList.map((card) => {
              return (
                <li key={card.id} className='cardlist__item'>
                  <MoviesCard {...card} onLikeClick={handleCardLikeClick} theme={theme} />
                </li>
              )
            })}
          </ul>
        )
      }

      {
        isShowMore &&
        (
          <section className='cardlist__button-section' aria-label='Еще больше фильмов!'>
            <button type='button' className='cardlist__button' onClick={handleNextPage}>Ещё</button>
          </section>
        )
      }
      <p>Cardlist {cardList.length}</p>
      <p>outputList {outputList.length}</p>
    </section>
  )
}