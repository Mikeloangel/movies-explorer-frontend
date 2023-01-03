import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

import './Header.css';

export default function Header({theme}) {

  return (
    <header className={`header ${theme === 'dark' && 'header_theme_dark'}`}>
      <Link to='/'>
        <div className="header__logo"></div>
      </Link>
      <Navigation theme={theme} />
    </header>
  )
}
