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

  const [savedCardList, setSavedCardList] = useState([]);
  const [isSavedCardListReady, setIsSavedCardListReady] = useState(false);

  const [infoToolTipType, setInfoToolTipType] = useState('hidden');
  const [infoToolTipMsg, setInfoToolTipMsg] = useState('');
  const imgList = { 'success': imgSuccess, 'fail': imgFail };

  // recieves users list of liked film
  useEffect(() => {
    if (isLogged) {
      Api.getSavedCards()
        .then(cards => {
          setSavedCardList(cards);
          setIsSavedCardListReady(true);
        })
        .catch(() => {
          setInfoToolTipMsg('Не удалось загрузить сохраненные фильмы.');
          setInfoToolTipType('fail');
        });
    } else {
      setSavedCardList([]);
      setIsSavedCardListReady(false);
    }
  }, [isLogged]);

  function handleMoviesCardLike(card, cb) {
    const baseUrl = 'https://api.nomoreparties.co';
    const movie = savedCardList.find(savedCard => savedCard.movieId === card.id)
    if (movie) {
      // then delete
      Api.deleteMovie(movie._id)
        .then(() => {
          setSavedCardList(prev => prev.filter(item => item.movieId !== movie.movieId));
          cb(movie.movieId, false);
        })
        .catch(errMsg => {
          setInfoToolTipMsg('Ошибка удаления лайка.' + errMsg);
          setInfoToolTipType('fail');
        });
    } else {
      // else add
      Api.postMovie({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year.toString(),
        description: card.description,
        image: baseUrl + card.image.url,
        trailerLink: card.trailerLink,
        thumbnail: baseUrl + card.image.formats.thumbnail.url,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN
      })
        .then(updatedCard => {
          setSavedCardList(prev => [updatedCard, ...prev]);
          cb(updatedCard.movieId, true);
        })
        .catch(errMsg => {
          setInfoToolTipMsg('Ошибка добавления лайка.' + errMsg);
          setInfoToolTipType('fail');
        });
    }
  }

  function handleSavedMoviesCardLike(card) {
    Api.deleteMovie(card._id)
      .then(() => {
        setSavedCardList(prev => prev.filter(item => item.movieId !== card.movieId));
      })
      .catch((errMsg) => {
        setInfoToolTipMsg('Ошибка удаления лайка.' + errMsg);
        setInfoToolTipType('fail');
      });
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
    <AppContext.Provider value={{ isLogged, currentUser, savedCardList, isSavedCardListReady }}>
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
