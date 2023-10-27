import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, sesionIniciada, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      sesionIniciada ? (
        <Component {...props} />
      ) : (
        <Navigate to="/" />
      )
    }
  />
);

export default ProtectedRoute;
