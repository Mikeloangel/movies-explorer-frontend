import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';

// context
import { AppContext } from '../../contexts/AppContext';

// components
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';

// Сделана микроанимация кнопок, ссылок и инпутов.
// Использован normalize.сss или стилизован строго по БЭМ — без внешних файлов.

function App() {
  const [isLogged, setIsLogged] = useState(false);

  // hardcode to change logged state
  function toggleUserState() {
    setIsLogged(!isLogged);
  }

  return (
    <AppContext.Provider value={{ isLogged }}>
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
          }}
          onClick={toggleUserState}>
          Click here to change state: is {isLogged ? 'logged' : 'logged out'}
        </p>
      </div>
    </AppContext.Provider>
  );
}

export default App;
