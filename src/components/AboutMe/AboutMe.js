import React from 'react';

import './AboutMe.css';

import imgProfile from '../../images/student.png'

export default function aboutMe() {
  return (
    <div className='aboutme'>
      <div className='aboutme__wrapper'>
        <h3 className='aboutme__name'>Виталий</h3>
        <p className='aboutme__position'>Фронтенд-разработчик, 30 лет</p>
        <p className='aboutme__bio'>
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
          и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
          С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
          начал заниматься фриланс-заказами и ушёл с постоянной работы.
        </p>
        <a href='https://github.com/Mikeloangel/' className='aboutme__link'>Github</a>
      </div>
      <img src={imgProfile} alt='Виталий' className='aboutme__pic' />
    </div>
  )
}