import React from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {


  return (

    <div className="root">
      <Switch>
        <Route exact path='/sign-up'>
          <p>Signup</p>
        </Route>

        <Route exact path='/sign-in'>
          <p>Login</p>
        </Route>

        <Route path='*'>
          <p>404</p>
        </Route>

      </Switch>
    </div>

  );
}

export default App;
