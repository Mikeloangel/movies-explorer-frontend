import React from 'react';

import './Portfolio.css';


export default function Portfolio() {
  return (
    <ul className='portfolio'>
      <li className='portfolio__item'>
        <a
          href='https://github.com/Mikeloangel/antools'
          className='portfolio__link'
          rel='noopener noreferrer'
          target='_blank'
        >
          <p className='portfolio__label'>Статичный сайт</p>
          <p className='portfolio__chevron'>↗</p>
        </a>
      </li>
      <li className='portfolio__item'>
        <a
          href='https://github.com/Mikeloangel/html-pet-castaway'
          className='portfolio__link'
          rel='noopener noreferrer'
          target='_blank'
        >
          <p className='portfolio__label'>Адаптивный сайт</p>
          <p className='portfolio__chevron'>↗</p>
        </a>
      </li>
      <li className='portfolio__item'>
        <a
          href='https://github.com/Mikeloangel/react-mesto-api-full'
          className='portfolio__link'
          rel='noopener noreferrer'
          target='_blank'
        >
          <p className='portfolio__label'>Одностраничное приложение</p>
          <p className='portfolio__chevron'>↗</p>
        </a>
      </li>
    </ul>
  )
}