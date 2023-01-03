import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';

// components
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';

// Сделана микроанимация кнопок, ссылок и инпутов.
// Использован normalize.сss или стилизован строго по БЭМ — без внешних файлов.

function App() {
  return (
    <div className="root">
      <Header />

      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>

        <Route exact path='/movies'>
          <Movies />
        </Route>

        <Route exact path='/saved-movies'>
          <SavedMovies />
        </Route>

        <Route exact path='/profile'>
          <Profile />
        </Route>

        <Route exact path='/signup'>
          <Register />
        </Route>

        <Route exact path='/signin'>
          <Login />
        </Route>

        <Route path='*'>
          <p>404</p>
        </Route>

      </Switch>

      <Footer />
    </div>

  );
}

export default App;
