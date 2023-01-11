import React from 'react';

import Promo from '../Promo/Promo';
import MainSection from '../MainSection/MainSection';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

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
