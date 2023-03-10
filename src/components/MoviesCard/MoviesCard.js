import React, { useMemo } from 'react';

import './MoviesCard.css';

export default function MoviesCard({
  id,
  nameRU, trailerLink,
  imgUrl, imgName,
  imgThumbnailUrl, imgLargeUrl, imgMediumUrl, imgSmallUrl,
  like = false,
  duration,
  onLikeClick,
  theme,
  baseUrl
}) {

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
            {imgThumbnailUrl && (<source media="(min-width:1000px)" srcSet={baseUrl + imgThumbnailUrl} />)}
            {imgLargeUrl && (<source media="(min-width:825px)" srcSet={baseUrl + imgLargeUrl} />)}
            {imgMediumUrl && (<source media="(min-width:625px)" srcSet={baseUrl + imgMediumUrl} />)}
            {imgSmallUrl && (<source media="(min-width:425px)" srcSet={baseUrl + imgSmallUrl} />)}
            <img src={baseUrl + imgUrl} alt={imgName} className='card__img' />
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
