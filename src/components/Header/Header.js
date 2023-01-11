import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

import './Header.css';

export default function Header({theme, isLoggedDebug}) {

  return (
    <header className={`header ${theme? 'header_theme_'+theme : ''} `}>
      <Link to='/'>
        <div className="header__logo"></div>
      </Link>
      <Navigation theme={theme} isLoggedDebug={isLoggedDebug}/>
    </header>
  )
}
