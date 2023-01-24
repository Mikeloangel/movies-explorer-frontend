import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

// context
import { AppContext } from '../../contexts/AppContext';

// CSS
import './App.css';

// Utils
import * as Api from '../../utils/MainApi';
import { MoviesApi } from '../../utils/MoviesApi';
import { removeItemsFromStorage } from '../../utils/MoviesLocalStorage';
import { CARD_MAIN_IMG_BASE_URL } from '../../utils/variables';

// components
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Header from '../Header/Header';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';

// images
import imgSuccess from '../../images/succeed.png';
import imgFail from '../../images/fail.png';

function App() {
  const history = useHistory();

  const [isAppReady, setIsAppReady] = useState(false);

  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [savedCardList, setSavedCardList] = useState([]);
  const [isSavedCardListReady, setIsSavedCardListReady] = useState(false);

  const [cardList, setCardList] = useState([]);
  const [isCardListReady, setIsCardListReady] = useState(false);

  const [infoToolTipType, setInfoToolTipType] = useState('hidden');
  const [infoToolTipMsg, setInfoToolTipMsg] = useState('');
  const imgList = { 'success': imgSuccess, 'fail': imgFail };
  const imgEnumTypes = { hidden: 'hidden', success: 'success', fail: 'fail' };

  const showInfoToolTipPopup = useCallback((msg, type) => {
    setInfoToolTipMsg(msg);
    setInfoToolTipType(type);
  }, []);

  // recieves users list of liked film
  useEffect(() => {
    if (isLogged) {
      Api.getSavedCards()
        .then(cards => {
          setSavedCardList(cards);
          setIsSavedCardListReady(true);
        })
        .catch((errMsg) => {
          showInfoToolTipPopup('Не удалось загрузить сохраненные фильмы.', imgEnumTypes.fail);
        });
    } else {
      setSavedCardList([]);
      setIsSavedCardListReady(false);
    }
  }, [isLogged, showInfoToolTipPopup, imgEnumTypes.fail]);

  // card like from Movies component
  function handleMoviesCardLike(card, cb) {
    const movie = savedCardList.find(savedCard => savedCard.movieId === card.id)
    if (movie) {
      // then delete liked movie
      Api.deleteMovie(movie._id)
        .then(() => {
          setSavedCardList(prev => prev.filter(item => item.movieId !== movie.movieId));
          cb(movie.movieId, false);
        })
        .catch(errMsg => {
          showInfoToolTipPopup('Ошибка удаления лайка.', imgEnumTypes.fail);
        });
    } else {
      // else add liked movie
      Api.postMovie({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year.toString(),
        description: card.description,
        image: CARD_MAIN_IMG_BASE_URL + card.image.url,
        trailerLink: card.trailerLink,
        thumbnail: CARD_MAIN_IMG_BASE_URL + card.image.formats.thumbnail.url,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN
      })
        .then(updatedCard => {
          setSavedCardList(prev => [updatedCard, ...prev]);
          cb(updatedCard.movieId, true);
        })
        .catch(errMsg => {
          showInfoToolTipPopup('Ошибка добавления лайка.', imgEnumTypes.fail)
        });
    }
  }

  // Card like from SaveMovies component
  function handleSavedMoviesCardLike(card) {
    Api.deleteMovie(card._id)
      .then(() => {
        setSavedCardList(prev => prev.filter(item => item.movieId !== card.movieId));
      })
      .catch(() => {
        showInfoToolTipPopup('Ошибка удаления лайка.', imgEnumTypes.fail);
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
      .catch(() => {
        setCurrentUser({});
        setIsLogged(false);
        removeItemsFromStorage();
      })
      .finally(() => {
        setIsAppReady(true);
      });
  }, [history, isLogged]);


  function handleInfoToolTipClose() {
    showInfoToolTipPopup('', imgEnumTypes.hidden);
  }

  function handleLoginOnFail() {
    showInfoToolTipPopup('Неверный логин или пароль!', imgEnumTypes.fail);
  }

  function handleLoginOnSuccess() {
    setIsLogged(true);
    history.push('/movies');
  }

  function handleLogout() {
    Api.logout()
      .then(msg => {
        setIsLogged(false);
        setCurrentUser({});
        history.push('/');
        removeItemsFromStorage();
        setCardList([]);
        setSavedCardList([]);
        setIsCardListReady(false);
        setIsSavedCardListReady(false);
        showInfoToolTipPopup(msg, imgEnumTypes.success);
      })
      .catch(() => {
        showInfoToolTipPopup('Произошла ошибка попробуйте заново', imgEnumTypes.fail);
      })
  }

  function handleProfileChange(updatedUser, err = null) {
    if (err) {
      showInfoToolTipPopup(err, imgEnumTypes.fail);
      return;
    }

    setCurrentUser(updatedUser);
    showInfoToolTipPopup('Успешно обновленно', imgEnumTypes.success);
  }

  function handleRegisterOnSuccess(values) {
    showInfoToolTipPopup('Успешно зарегистрированы', imgEnumTypes.success);

    Api.authorization(values.email, values.password)
      .then(() => {
        setIsLogged(true);
        showInfoToolTipPopup('Добро пожаловать!', imgEnumTypes.success);
        history.push('/movies');
      })
      .catch(() => {
        showInfoToolTipPopup('Ошибка автоматического входа!', imgEnumTypes.fail);
        history.push('/signin');
      });
  }

  function handleRegisterOnFail(msg) {
    showInfoToolTipPopup(msg, imgEnumTypes.fail);
  }

  function handleFirstSearch(cb) {
    MoviesApi()
      .then(data => {
        setCardList(data);
        setIsCardListReady(true);
      })
      .catch((errMsg) => {
        showInfoToolTipPopup(`Во время запроса произошла ошибка.Возможно, проблема с соединением или сервер недоступен.
        Подождите немного и попробуйте ещё раз`, imgEnumTypes.fail);
        setIsCardListReady(false);
        setCardList([]);
      });
  }

  return (
    <AppContext.Provider value={{ isLogged, currentUser, cardList, isCardListReady, savedCardList, isSavedCardListReady }}>
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
                  <Movies onMoviesCardLike={handleMoviesCardLike} onFirstSearch={handleFirstSearch} />
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
            (<Preloader theme='fullscreen' />)
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
