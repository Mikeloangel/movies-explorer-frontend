import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";


import { AppContext } from '../../contexts/AppContext';
import Preloader from "../Preloader/Preloader";
import { CARD_MAIN_IMG_BASE_URL } from "../../utils/variables";
import '../MoviesCard/MoviesCard.css';
import './Movie.css';

export default function Movie({ onFirstLoad, onLikeClick }) {
  const { movieId } = useParams();

  const { cardList, isCardListReady, savedCardList, isSavedCardListReady } = useContext(AppContext);

  const [selectedCard, setSelectedCard] = useState({});
  const [isSelectedCardReady, setIsSelectedCardReady] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    if (!isCardListReady) {
      typeof onFirstLoad === 'function' && onFirstLoad();
      return;
    }

    const scard = cardList.find(card => card.id === parseInt(movieId));
    if (scard) {
      scard.like = isSavedCardListReady ? savedCardList.find(e => e.movieId === scard.id) : false;

      setSelectedCard(scard);
      setIsSelectedCardReady(true);
    } else {
      setIsNotFound(false);
    }

  }, [isCardListReady, onFirstLoad, cardList, movieId, savedCardList, isSavedCardListReady]);

  const formattedDuration = useMemo(() => {
    const hr = Math.floor(selectedCard.duration / 60);
    const mm = selectedCard.duration - hr * 60;
    return `${hr}ч ${mm}м`;
  }, [selectedCard.duration]);

  function handleLikeClick(e) {
    if (typeof onLikeClick === 'function') {
      onLikeClick(selectedCard);
    }
  }

  return (
    <section className="movie">
      {
        isSelectedCardReady ?
          (
            <article className={`card card_theme_single`}>
              <figure className='card__figure'>
                <a
                  href={selectedCard.trailerLink}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <img src={CARD_MAIN_IMG_BASE_URL + (selectedCard.image.formats.large?.url || selectedCard.image.url)} alt={selectedCard.nameRU} className='card__img' />
                </a>
                <figcaption className='card__figcapture' title={selectedCard.nameRU}>
                  <div className='card__titles-wrapper'>
                    <h2 className='card__title'>{selectedCard.nameRU}</h2>
                    <h3 className='card__title-small' title={selectedCard.nameEN}>{selectedCard.nameEN}</h3>
                  </div>
                  <button
                    className={`card__like ${selectedCard.like && 'card__like_type_active'}`}
                    onClick={handleLikeClick}
                  >
                  </button>
                </figcaption>
              </figure>
              <p className='card__duration'>{formattedDuration}
                {selectedCard.country.toLowerCase() !== 'unknown' && (<span className='card__country'>Страна: {selectedCard.country}</span>)}
              </p>
              <p className='card__description'>{selectedCard.description}</p>
            </article>
          ) :
          (
            !isCardListReady ?
              (<Preloader />) :
              (<p className="movie__notfound">{isNotFound && 'Не найдено'}</p>)
          )
      }
    </section>
  )
}