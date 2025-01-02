import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom'; // Nous utilisons Navigate et Route
import { UserContext } from '../context/user'; // Contexte utilisateur

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useContext(UserContext); // Récupération de l'utilisateur depuis le contexte

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/" />} // Si l'utilisateur est connecté, on affiche la route, sinon redirection
    />
  );
};

export default PrivateRoute;
