import React from 'react';

import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <h2 className='footer__info'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className='footer__copy'>
        <div className='footer__smallprint'>
          Варушичев Михаил &copy; 2023
        </div>
        <ul className='footer__list'>
          <li className='footer__list-item'>
            <a href='https://practicum.yandex.ru/' className='footer__list-link'>Яндекс.Практикум</a>
          </li>
          <li className='footer__list-item'>
            <a href='https://github.com/Mikeloangel/' className='footer__list-link'>Github</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
