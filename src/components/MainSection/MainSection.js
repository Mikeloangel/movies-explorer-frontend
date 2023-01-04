import React from 'react';

import './MainSection.css';

export default function MainSection({ title, theme = null, children }) {
  const themeClassName = !theme ? '' : `mainsection_theme_${theme}`;

  return (
    <section className={`mainsection ${themeClassName}`}>
      <h2 className='mainsection__title'>{title}</h2>
      {children}
    </section>
  )
}