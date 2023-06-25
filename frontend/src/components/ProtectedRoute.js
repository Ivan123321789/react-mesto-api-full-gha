import React from 'react';
 import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ isLoggedIn, children}) => {
    // return (
    //     isLoggedIn ? children : <Navigate to='/signin' replace/>
    // )   

// }
const ProtectedRoute = ({ element: Component, loggedIn, ...props }) => {
    return loggedIn ? (
      <Component {...props} />
    ) : (
      <Navigate to="/signin" replace />
    );
  };
         
 export default ProtectedRoute;