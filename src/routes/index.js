import React, { useEffect } from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { me } from '../slices/meSlice';
//Pages
import Company from '../pages/Company';
//Navigation
import AuthRoutes from './auth.routes';
//Hooks
import userAuth from '../hooks/useAuth';

const Routes = () => {

  //Verificar se está atenticado
  const { auth } = userAuth();

  //Dados do usuário
  const dispatch = useDispatch();

  useEffect(()=>{ //Quando for autenticado, será obtido os dados pessoais do usuário;
    if(auth){
      dispatch(me());
    }

  }, [auth]);

  return (
    auth ? <Company/> : <AuthRoutes/>
  )
}

export default Routes;