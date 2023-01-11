import React from 'react';
import { Link } from 'react-router-dom';


import './Auth.css';
import imgLogo from '../../images/logo.png';

export default function Auth({children, title}) {

  return (
    <main className='auth'>
      <Link to='/'>
        <img
          src={imgLogo}
          alt='Логотип Movie Explorer'
          width='38'
          height='38'
          className='auth__logo' />
      </Link>

      <h1 className='auth__title'>{title || 'Присоединяйтесь'}</h1>

      {children}

    </main>
  )
}
