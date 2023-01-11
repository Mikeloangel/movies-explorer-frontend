import React, { useMemo } from 'react';

import './MoviesCard.css';

export default function MoviesCard({ id, nameRU, trailerLink, image, like = false, duration, onLikeClick, theme }) {
  // HARDCODE base url
  const baseURL = 'https://api.nomoreparties.co';

  function handleLikeClick() {
    if (typeof onLikeClick === 'function') {
      onLikeClick(id);
    }
  }

  const formattedDuration = useMemo(() => {
    const hr = Math.floor(duration / 60);
    const mm = duration - hr * 60;
    return `${hr}ч ${mm}м`;
  }, [duration]);

  return (
    <article className={`card card_theme_${theme}`}>
      <figure className='card__figure'>
        <a
          href={trailerLink}
          rel='noopener noreferrer'
          target='_blank'
        >
          <picture className='card__picture'>
            <source media="(min-width:1000px)" srcSet={baseURL + image.formats.thumbnail.url} />
            {image.formats.large && (<source media="(min-width:825px)" srcSet={baseURL + image.formats.large.url} />)}
            {image.formats.medium && (<source media="(min-width:625px)" srcSet={baseURL + image.formats.medium.url} />)}
            {image.formats.small && (<source media="(min-width:425px)" srcSet={baseURL + image.formats.small.url} />)}
            <img src={baseURL + image.url} alt={image.name} className='card__img' />
          </picture>
        </a>
        <figcaption className='card__figcapture' title={nameRU}>
          <h2 className='card__title'>{nameRU}</h2>
          <button
            className={`card__like ${like && 'card__like_type_active'}`}
            onClick={handleLikeClick}
          >
          </button>
        </figcaption>
      </figure>
      <p className='card__duration'>{formattedDuration}</p>
    </article>
  )
}
