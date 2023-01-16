import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

// context
import { AppContext } from '../../contexts/AppContext';

import * as Api from '../../utils/MainApi';
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
import InfoToolTip from '../InfoToolTip/InfoToolTip';

// images
import imgSuccess from '../../images/succeed.png';
import imgFail from '../../images/fail.png';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';

function App() {
  const history = useHistory();

  const [isAppReady, setIsAppReady] = useState(false);

  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [cardList, setCardList] = useState([]);
  const [isCardListReady, setIsCardListReady] = useState(false);

  const [infoToolTipType, setInfoToolTipType] = useState('hidden');
  const [infoToolTipMsg, setInfoToolTipMsg] = useState('');
  const imgList = { 'success': imgSuccess, 'fail': imgFail };

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
          data[0].like = true;
          data[3].like = true;
          data[5].like = true;
          setCardList(data.slice(0, 16));
        });
    } else {
      setIsCardListReady(false);
      setCardList([]);
    }
  }, [isLogged]);

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


  // if can getUsersMe then we have valid cookies and can update userinfo
  // othervise logout
  useEffect(() => {
    Api.getUserMe()
      .then(userInfo => {
        setCurrentUser(userInfo);
        setIsLogged(true);
      })
      .catch((err) => {
        setIsLogged(false);
        setCurrentUser({});
        if (isLogged) {
          history.push('/signin');
        }
      })
      .finally(() => {
        setIsAppReady(true);
      });
  }, [history, isLogged]);


  function handleInfoToolTipClose() {
    setInfoToolTipMsg('');
    setInfoToolTipType('hidden');
  }

  function handleLoginOnFail(errMsg) {
    console.error(errMsg);
    setInfoToolTipMsg('Неверный логин или пароль!');
    setInfoToolTipType('fail');
  }

  function handleLoginOnSuccess() {
    setIsLogged(true);
    history.push('/');
  }

  function handleLogout() {
    Api.logout()
      .then(msg => {
        setIsLogged(false);
        setCurrentUser({});
        history.push('/');
        setInfoToolTipMsg(msg);
        setInfoToolTipType('success');
      })
      .catch(() => {
        setInfoToolTipMsg('Произошла ошибка попробуйте заново');
        setInfoToolTipType('fail');
      })
  }

  function handleProfileChange(updatedUser, err = null) {
    if (err) {
      setInfoToolTipMsg(err);
      setInfoToolTipType('fail');
      return;
    }

    setCurrentUser(updatedUser);
    setInfoToolTipMsg('Успешно обновленно');
    setInfoToolTipType('success');
  }

  function handleRegisterOnSuccess() {
    setInfoToolTipMsg('Успешно зарегистрированы');
    setInfoToolTipType('success');
    history.push('/signin');
  }

  function handleRegisterOnFail(msg) {
    setInfoToolTipMsg(msg);
    setInfoToolTipType('fail');
  }

  return (
    <AppContext.Provider value={{ isLogged, currentUser, isCardListReady, cardList }}>
      <div className="app">
        {
          isAppReady ?
            (
              <Switch>
                <Route exact path='/'>
                  <Header theme='dark' />
                  <Main />
                  <Footer />
                </Route>

                <ProtectedRoute exact path='/movies' >
                  <Header />
                  <Movies onMoviesCardLike={handleMoviesCardLike} />
                  <Footer />
                </ProtectedRoute>


                <ProtectedRoute exact path='/saved-movies'>
                  <Header />
                  <SavedMovies onMoviesCardLike={handleSavedMoviesCardLike} />
                  <Footer />
                </ProtectedRoute>

                <ProtectedRoute exact path='/profile'>
                  <Header />
                  <Profile
                    onChange={handleProfileChange}
                    onLogout={handleLogout} />
                </ProtectedRoute>

                <Route exact path='/signup'>
                  <Register
                    onFail={handleRegisterOnFail}
                    onSuccess={handleRegisterOnSuccess}
                  />
                </Route>

                <Route exact path='/signin'>
                  <Login
                    onFail={handleLoginOnFail}
                    onSuccess={handleLoginOnSuccess} />
                </Route>

                <Route path='*'>
                  <NotFound />
                </Route>
              </Switch>
            ) :
            (<Preloader />)
        }


        {/* success' 'fail' */}
        <InfoToolTip
          message={infoToolTipMsg}
          imgList={imgList}
          type={infoToolTipType}
          onClose={handleInfoToolTipClose}
          autoClose='3000' />

      </div>
    </AppContext.Provider >
  );
}

export default App;
