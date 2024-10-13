import React, { useEffect, useState, useContext } from 'react';
//Components
import LoadingPage from '../components/LoadingPage';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { me } from '../slices/meSlice';
//Pages
import Company from '../pages/Company';
//Navigation
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
//Hooks
import userAuth from '../hooks/useAuth';
import { LoadingContext } from '../contexts/LoadingContext';

const Routes = () => {

  //Contexto
  const { loading } = useContext(LoadingContext);

  //Verificar se está atenticado
  const { auth } = userAuth();

  //Dados do usuário
  const dispatch = useDispatch();

  useEffect(()=>{ //Quando for autenticado, será obtido os dados pessoais do usuário;
    if(auth){
      dispatch(me());
    }

  }, [auth]);

  //Obter dados do usuário.
  const { loading: loadingMe, userData } = useSelector((state) => state.me);
  const [ accessHome, setAccessHome ] = useState(false);
  const [ accessCompany, setAccessCompany ] = useState(false);

  //Direcionar pra página Home automaticamente caso estiver associado a uma empresa;
  useEffect(()=>{

    if(!loadingMe && userData){
      if(userData.companys_joined.length){
        setAccessHome(true);
        setAccessCompany(false);

      }

      if(!userData.companys_joined.length){
        setAccessCompany(true);
        setAccessHome(false);
      }

    }
    
  }, [userData, loadingMe]);

  return (
    <>
      {
        loadingMe ? <LoadingPage/> : (
          <>
            {auth && accessHome && <AppRoutes />}
            {auth && accessCompany && <Company />}
            {!auth && <AuthRoutes />}   
          </>       
        )
      }
    </>
  )
};

export default Routes;