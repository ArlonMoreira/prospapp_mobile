import React from 'react';
//Pages
import Company from '../pages/Company';
//Navigation
import AuthRoutes from './auth.routes';
//Hooks
import userAuth from '../hooks/useAuth';

const Routes = () => {

  const { auth } = userAuth();

  return (
    <Company/>
    // auth ? <Company/> : <AuthRoutes/>
  )
}

export default Routes;