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
          С помощью разработки интерфейсов хочу делать мир более доступным, приятным и интересным.
          Для достижения цели дополнительно решаю задачи на CodeWars, почитываю книгу Т. Кормен “Алгоритмы”, смотрю профильные ютуб каналы на английском языке.
          В свободное время путешествую, хожу в походы, увлекаюсь плаванием и велосипедом.
          Живу с французским бульдогом из приюта.
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