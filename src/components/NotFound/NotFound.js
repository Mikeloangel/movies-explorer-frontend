import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css';

export default function NotFound() {
  return (
    <main className='notfound'>
      <div className='notfound__info'>
        <h1 className='notfound__header'>404</h1>
        <p className='notfound__description'>Страница не найдена</p>
      </div>
      <div className='notfound__links'>
        <Link to='/' className='notfound__link'>Назад</Link>
      </div>
    </main>
  )
}