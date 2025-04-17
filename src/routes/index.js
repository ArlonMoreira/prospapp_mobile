import React, { useEffect, useState, useContext } from 'react';
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
//Components
import LoadingPage from '../components/LoadingPage';

const Routes = () => {

  //Contexto
  //const { loading } = useContext(LoadingContext);

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

    if(userData){
      if(userData.companys_joined.length){
        setAccessHome(true);
        setAccessCompany(false);

      } else {
        setAccessCompany(true);
        setAccessHome(false); 
               
      }

    }
    
  }, [userData]);

  return (
    <>
    {
      auth ? (
        <>
          {
            loadingMe ? (
              <LoadingPage backgroundColor={'#046b5b'}/>
            ) : (
              <>
                { auth && accessHome && <AppRoutes /> }
                { auth && accessCompany && <Company /> }          
              </>
            )
          }        
        </>
      ): (
        <AuthRoutes />
      )
    }
    </>
  )
};

export default Routes;