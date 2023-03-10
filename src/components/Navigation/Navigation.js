import React, { useContext } from 'react';

import { AppContext } from '../../contexts/AppContext';

import NavJoin from '../NavJoin/NavJoin';
import NavMenu from '../NavMenu/NavMenu';

import './Navigation.css';

export default function Navigation(props) {
  const { isLogged } = useContext(AppContext);

  return (
    isLogged ?
      <NavMenu {...props} /> :
      <NavJoin {...props} />
  )
}
