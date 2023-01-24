import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { AppContext } from '../../contexts/AppContext';

function ProtectedRoute({ ...props }) {
  const { isLogged } = useContext(AppContext);

  return (
    <Route>
      {
        isLogged ?
          props.children :
          <Redirect to={'./signin'} />
      }
    </Route>
  );
}

export default ProtectedRoute;
