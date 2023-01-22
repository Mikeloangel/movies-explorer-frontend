import React from 'react';

import './AboutMe.css';

import imgProfile from '../../images/student.jpg'

export default function aboutMe() {
  return (
    <div className='aboutme'>
      <div className='aboutme__wrapper'>
        <h3 className='aboutme__name'>Михаил</h3>
        <p className='aboutme__position'>Фронтенд-разработчик, 36 лет</p>
        <p className='aboutme__bio'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, aut magnam.
          Voluptate placeat nostrum, unde iure quidem beatae. Facilis, ex.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, aut magnam.
          Voluptate placeat nostrum, unde iure quidem beatae. Facilis, ex.
        </p>
        <a
          href='https://github.com/Mikeloangel/'
          className='aboutme__link'
          target='_blank'
          rel="noopener noreferrer">
          Github
        </a>
      </div>
      <img src={imgProfile} alt='Михаил' className='aboutme__pic' />
    </div>
  )
}