import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'

const PrivateRoutes = () => {

    const isAuthenticated = sessionStorage.getItem('jwt');

  return !isAuthenticated ? <Navigate to="/sign-in" /> : <Outlet />
}

export default PrivateRoutes