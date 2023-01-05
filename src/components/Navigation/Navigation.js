import React, { useContext } from 'react';

import { AppContext } from '../../contexts/AppContext';

import NavJoin from '../NavJoin/NavJoin';
import NavMenu from '../NavMenu/NavMenu';

import './Navigation.css';

export default function Navigation({ theme }) {
  const { isLogged } = useContext(AppContext);

  return (
    isLogged ?
      <NavMenu theme={theme} /> :
      <NavJoin theme={theme} />
  )
}
