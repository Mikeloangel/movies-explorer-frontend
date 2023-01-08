import React, { useContext } from 'react';

import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

import { AppContext } from '../../contexts/AppContext';

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

export default function MoviesCardList({ cardList, emptyMessageSettings, onCardLikeClick, theme }) {
  const { isCardListReady } = useContext(AppContext);

  function handleCardLikeClick(id) {
    if (typeof onCardLikeClick === 'function') {
      onCardLikeClick(id);
    }
  }

  return (
    <section className='cardlist'>
      {
        !isCardListReady ?
          <Preloader /> :
          (
            cardList.length === 0 ?
              <section className='cardlist__empty'>
                <h2 className='cardlist__empty-title'>{emptyMessageSettings?.title || 'Список пуст'}</h2>
                <Link to={emptyMessageSettings?.redirect || '/'} className='cardlist__empty-link'>
                  {emptyMessageSettings?.redirectTitle || 'Попрбовать сначала'}
                </Link>
              </section> :
              <ul className='cardlist__list'>
                {cardList.map((card) => {
                  return (
                    <li key={card.id} className='cardlist__item'>
                      <MoviesCard {...card} onLikeClick={handleCardLikeClick} theme={theme}/>
                    </li>
                  )
                })}
              </ul>
          )
      }
      {
        isCardListReady && cardList.length !== 0 && (
          <section className='cardlist__button-section'>
            <button type='button' className='cardlist__button'>Ещё</button>
          </section>
        )
      }
    </section>
  )
}