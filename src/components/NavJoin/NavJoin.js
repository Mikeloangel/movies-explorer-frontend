import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavJoin.css';

export default function NavJoin({ theme }) {
  return (
    <nav className='navigation'>
      <ul className={`navigation__list navigation__list_theme_${theme}`}>
        <li className='navigation__item'>
          <NavLink
            to='/signup'
            className={`navigation__link navigation__link_theme_${theme}`}>
            Регистрация
          </NavLink>
        </li>
        <li className='navigation__item'>
          <NavLink
            to='/signin'
            className={`navigation__button navigation__button_theme_${theme}`}>
            Войти
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}