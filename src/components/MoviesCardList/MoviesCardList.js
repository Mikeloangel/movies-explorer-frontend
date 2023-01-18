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
 * @param {onCardLikeClick} function call back to set like for a card
 * @param {theme} String describes components theme
 * @param {pagenation} Boolean describes do we need pagination in component
 * @returns JSX
 */

export default function MoviesCardList({ cardList, emptyMessageSettings, onCardLikeClick, theme, pagenation }) {
  function handleCardLikeClick(id) {
    if (typeof onCardLikeClick === 'function') {
      onCardLikeClick(id);
    }
  }

  // we are using ref to determine number of columns in a grid
  const gridElementRef = useRef();
  const [numberOfColumns, setNumberOfColumns] = useState(4);
  const [sliceLimiter, setSliceLimiter] = useState(0);
  const [outputList, setOutputList] = useState([]);

  // calculates real number of columns
  const calcColumns = useCallback(() => {
    if (!gridElementRef.current) {
      return -1;
    }

    const gridComputedStyle = window.getComputedStyle(gridElementRef.current);
    const nCols = gridComputedStyle
      .getPropertyValue('grid-template-columns')
      .replace(' 0px', '')
      .split(' ')
      .length;

    return nCols;
  }, [])

  // handles window resize event
  useEffect(() => {
    let resizeTimer = null;

    function handleResize() {
      if (!resizeTimer) {
        resizeTimer = setTimeout(function () {
          setNumberOfColumns(calcColumns());
          resizeTimer = null;
        }, 250);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [numberOfColumns, gridElementRef, calcColumns]);

  // initial slice limiter value
  useEffect(() => {
    const nColumns = calcColumns();
    setNumberOfColumns(nColumns);
    const initSlicer = nColumns >= 3 ? 12 : nColumns === 2 ? 8 : 5
    setSliceLimiter(initSlicer);
  }, [calcColumns]);

  // refreshes output list
  useEffect(() => {
    const newSlice = pagenation ?
      cardList.slice(0, sliceLimiter) :
      cardList.slice();

    setOutputList(newSlice);
  }, [cardList, sliceLimiter, pagenation]);

  // on click next page
  function handleNextPage() {
    const increment = (numberOfColumns > 1 ? numberOfColumns : 5);
    // addition needs to calculate missed cards to fill row evenly
    const addition = numberOfColumns - sliceLimiter % numberOfColumns === numberOfColumns ? 0 : numberOfColumns - sliceLimiter % numberOfColumns;
    setSliceLimiter(sliceLimiter + increment + addition);
  }

  // determines do we need to show more button
  const isShowMore = pagenation && sliceLimiter < cardList.length && outputList.length > 0;

  return (
    <section className='cardlist' aria-label='Список фильмов'>
      {
        outputList.length === 0 && (
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
        )
      }

      <ul className='cardlist__list' ref={gridElementRef}>
        {outputList.map((card) => {
          return (
            <li key={card.id} className='cardlist__item'>
              <MoviesCard {...card} onLikeClick={handleCardLikeClick} theme={theme} />
            </li>
          )
        })}
      </ul>

      {
        isShowMore &&
        (
          <section className='cardlist__button-section' aria-label='Еще больше фильмов!'>
            <button type='button' className='cardlist__button' onClick={handleNextPage}>Ещё</button>
          </section>
        )
      }
    </section>
  )
}