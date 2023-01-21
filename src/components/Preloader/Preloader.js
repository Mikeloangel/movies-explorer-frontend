import React from 'react'
import './Preloader.css'

const Preloader = ({ theme = '' }) => {
  return (
    <div className={`preloader preloader_theme_${theme}`} >
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader;
