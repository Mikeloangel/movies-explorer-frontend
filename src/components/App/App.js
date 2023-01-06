import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

// context
import { AppContext } from '../../contexts/AppContext';

import './App.css';

// components
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';

// Сделана микроанимация кнопок, ссылок и инпутов.
// Использован normalize.сss или стилизован строго по БЭМ — без внешних файлов.

function App() {
  const [isLogged, setIsLogged] = useState(true);
  const [currentUser, setCurrentUser] = useState({email:'mail@yandex.ru',name:'Виталий'});

  /* HARDCODE: button handler to change logged state to check navbar look */
  function toggleUserState() {
    setIsLogged(!isLogged);
  }

  return (
    <AppContext.Provider value={{ isLogged, currentUser }}>
      <div className="root">
        <Switch>
          <Route exact path='/'>
            <Header theme='dark' />
            <Main />
            <Footer />
          </Route>

          <Route exact path='/movies'>
            <Header />
            <Movies />
            <Footer />
          </Route>

          <Route exact path='/saved-movies'>
            <Header />
            <SavedMovies />
            <Footer />
          </Route>

          <Route exact path='/profile'>
            <Header />
            <Profile />
          </Route>

          <Route exact path='/signup'>
            <Register />
          </Route>

          <Route exact path='/signin'>
            <Login />
          </Route>

          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>

        {/* HARDCODE: button to change logged state to check navbar look */}
        <p
          style={{
            cursor: 'pointer',
            fontSize: '10px',
            backgroundColor: 'pink',
            position: 'fixed',
            top: 0,
            left: 0,
            padding: 0,
            margin: 0,
            outline: '2px dashed coral'
          }}
          onClick={toggleUserState}>
          Click here to change state: is {isLogged ? 'logged' : 'logged out'}
        </p>
      </div>
    </AppContext.Provider>
  );
}

export default App;
