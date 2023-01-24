import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Components
import MoviesCard from '../MoviesCard/MoviesCard';

// Utils
import { getObjectPropertyByPath } from '../../utils/getObjectPropertyByPath';

// CSS
import './MoviesCardList.css';

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
 * @param {cardLikeFields} Object object of settings
 * @returns JSX
 */

/**
cardListFields values:
id - how id is named in card (e.g. 'id' or 'movieId')
baseUrl - base url be added to image links
mainImgPath - main path to img value in an object (formats.img.url)
imgFormats - list of supported image formats if any
    'thumbnail': main path to thumbnail img value in an object (image.formats.thumb)
    'large': main path to large img value in an object (image.formats.large)
    'medium': main path to medium img value in an object (image.formats.medium)
    'small': main path to small img value in an object (image.formats.small)
    },
  }
 */

export default function MoviesCardList({ cardList, emptyMessageSettings, onCardLikeClick, theme, pagenation, cardListFields }) {
  function handleCardLikeClick(id) {
    if (typeof onCardLikeClick === 'function') {
      onCardLikeClick(cardList.find(card => card[cardListFields.id] === id));
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
    const addition = numberOfColumns - sliceLimiter % numberOfColumns === numberOfColumns ?
      0 :
      numberOfColumns - sliceLimiter % numberOfColumns;
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
            <li key={card[cardListFields.id]} className='cardlist__item'>
              <MoviesCard
                // {...card}
                onLikeClick={handleCardLikeClick}
                theme={theme}
                id={card[cardListFields.id]}
                like={card.like}
                nameRU={card.nameRU}
                duration={card.duration}
                trailerLink={card.trailerLink}
                baseUrl={cardListFields.baseUrl}
                imgName={card.nameRU}
                imgUrl={getObjectPropertyByPath(card, cardListFields.mainImgPath)}
                imgThumbnailUrl={getObjectPropertyByPath(card, cardListFields.imgFormats.thumbnail)}
                imgLargeUrl={getObjectPropertyByPath(card, cardListFields.imgFormats.large)}
                imgMediumUrl={getObjectPropertyByPath(card, cardListFields.imgFormats.medium)}
                imgSmallUrl={getObjectPropertyByPath(card, cardListFields.imgFormats.small)}
              />
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