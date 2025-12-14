import React, { useEffect, useState, useContext } from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { me } from '../slices/meSlice';
import { loadStoredUserAuth } from '../slices/authSlice';
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
  const { auth, hydrated } = userAuth();

  //Dados do usuárior
  const dispatch = useDispatch();
  
  //Carregar autenticação em cache
  useEffect(() => {
    dispatch(loadStoredUserAuth());
  }, []);

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
              <LoadingPage backgroundColor={'#0C6661'}/>
            ) : (
              <>
                { auth && accessHome && <AppRoutes /> }
                { auth && accessCompany && <Company /> }          
              </>
            )
          }        
        </>
      ): (
        !hydrated ? <LoadingPage backgroundColor={'#0C6661'}/>: <AuthRoutes />
      )
    }
    </>
  )
};

export default Routes;