import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(UserContext);

  if (currentUser === undefined) return <p>Loading...</p>; // optional

  if (!currentUser) return <Navigate to="/login" replace />;

  // If logged in, show the component
  return children;
};

export default PrivateRoute;
