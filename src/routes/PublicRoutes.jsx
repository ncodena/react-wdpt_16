import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'

const PublicRoutes = () => {

    const isAuthenticated = sessionStorage.getItem('jwt');

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />
}

export default PublicRoutes