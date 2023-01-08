import React, { useState, useEffect } from 'react';
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

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState({ email: 'mail@yandex.ru', name: 'Виталий' });

  const [cardList, setCardList] = useState([]);
  const [isCardListReady, setIsCardListReady] = useState(false);

  // HARDCODE: loads some data from API
  useEffect(() => {
    if (isLogged) {
      fetch('https://api.nomoreparties.co/beatfilm-movies',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(data => {
          setIsCardListReady(true);
          // data[0].like = true;
          setCardList(data.slice(0, 16));
        });
    } else {
      setIsCardListReady(false);
      setCardList([]);
    }
  }, [isLogged]);

  /* HARDCODE: button handler to change logged state to check navbar look */
  function toggleUserState() {
    setIsLogged((prev) => !prev);
  }

  function handleMoviesCardLike(id) {
    // HARDCODE
    setCardList(
      cardList.map((item) => {
        if (item.id === id) {
          item.like = !item.like;
        }
        return item;
      }));
  }

  function handleSavedMoviesCardLike(id) {
    // HARDCODE
    setCardList(
      cardList.map((item) => {
        if (item.id === id) {
          item.like = !item.like;
        }
        return item;
      }));
  }

  return (
    <AppContext.Provider value={{ isLogged, currentUser, isCardListReady, cardList }}>
      <div className="root">
        <Switch>
          <Route exact path='/'>
            <Header theme='dark' />
            <Main />
            <Footer />
          </Route>

          <Route exact path='/movies'>
            <Header />
            <Movies onMoviesCardLike={handleMoviesCardLike} />
            <Footer />
          </Route>

          <Route exact path='/saved-movies'>
            <Header />
            <SavedMovies onMoviesCardLike={handleSavedMoviesCardLike} />
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
            fontSize: '15px',
            backgroundColor: 'pink',
            position: 'fixed',
            top: 0,
            left: 0,
            padding: 0,
            margin: 0,
            outline: '2px dashed coral'
          }}
          onClick={toggleUserState}>
          Click here to log {isLogged ? 'OUT' : 'IN'}
        </p>
      </div>
    </AppContext.Provider>
  );
}

export default App;
