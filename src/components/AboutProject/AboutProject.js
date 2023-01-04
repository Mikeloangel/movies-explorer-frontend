import React from 'react';

import './AboutProject.css';

export default function AboutProject() {

  return (
    <div className='about'>
      <div className='about__wrapper'>
        <div className='about__card'>
          <h2 className='about__title'>
            Дипломный проект включал 5 этапов
          </h2>
          <p className='about__description'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className='about__card'>
          <h2 className='about__title'>
            На выполнение диплома ушло 5 недель
          </h2>
          <p className='about__description'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className='about__grid-wrapper'>
        <p className='about__grid-cell about__grid-cell_type_accent'>1 неделя</p>
        <p className='about__grid-cell'>4 недели</p>
        <p className='about__grid-cell about__grid-cell_type_transparent'>Back-end</p>
        <p className='about__grid-cell about__grid-cell_type_transparent'>Front-end</p>
      </div>
    </div>
  )
}