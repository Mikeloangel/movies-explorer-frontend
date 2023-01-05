import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavJoin.css';

export default function NavJoin({ theme }) {
  return (
    <nav className='navigation'>
      <ul className={`navigation__list ${theme === 'dark' && 'navigation__list_theme_dark'}`}>
        <li className='navigation__item'>
          <NavLink
            to='/signup'
            className={`navigation__link ${theme && 'navigation__link_theme_dark'}`}>
            Регистрация
          </NavLink>
        </li>
        <li className='navigation__item'>
          <NavLink
            to='/signin'
            className={`navigation__button ${theme === 'dark' && 'navigation__button_theme_dark'}`}>
            Войти
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}