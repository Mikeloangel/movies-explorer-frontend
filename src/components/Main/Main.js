import React from 'react';

// Components
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import MainSection from '../MainSection/MainSection';
import Portfolio from '../Portfolio/Portfolio';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';

// CSS
import './Main.css';

export default function Main() {
  return (
    <main className='main'>
      <Promo />

      <MainSection title='О проекте' theme=''>
        <AboutProject />
      </MainSection>

      <MainSection title='Технологии' theme='gray'>
        <Techs />
      </MainSection>

      <MainSection title='Студент' theme='compact'>
        <AboutMe />
      </MainSection>

      <MainSection title='Портфолио' theme='slim'>
        <Portfolio />
      </MainSection>

    </main>
  )
}
