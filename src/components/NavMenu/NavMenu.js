import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import imgAccount from '../../images/ico-account.svg';
import './NavMenu.css';

export default function NavMenu({ theme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenuOpen() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <div
        className={`burger ${isMenuOpen && 'burger_active'} burger_theme_${theme} `}
        onClick={toggleMenuOpen}>
        <div className="burger-stripe"></div>
      </div>
      <nav className={`navigation navigation__type_mobile ${isMenuOpen && 'navigation_active'}`}>
        <ul className={`navigation__list navigation__list_theme_${theme}`}>
          <li className='navigation__item'>
            <NavLink
              to='/'
              exact
              className={`navigation__link navigation__link_theme_${theme} navigation__link_type_mobile`}
              activeClassName='navigation__link_active'
              onClick={handleCloseMenu}>
              Главная
            </NavLink>
          </li>
          <li className='navigation__item'>
            <NavLink
              to='/movies'
              className={`navigation__link navigation__link_theme_${theme}`}
              activeClassName='navigation__link_active'
              onClick={handleCloseMenu}>
              Фильмы
            </NavLink>
          </li>
          <li className='navigation__item'>
            <NavLink
              to='/saved-movies'
              className={`navigation__link navigation__link_theme_${theme}`}
              activeClassName='navigation__link_active'
              onClick={handleCloseMenu}>
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>

        <NavLink
          to='/profile'
          className={`navigation__account navigation__account_theme_${theme}`}
          onClick={handleCloseMenu}>
          <img src={imgAccount} alt='Профиль' className='navigation__account-img' />
          Аккаунт
        </NavLink>

      </nav>
      <div className={`navigation__list-overlay ${isMenuOpen && 'navigation__list-overlay_active'}`} onClick={handleCloseMenu}></div>
    </>
  )
}