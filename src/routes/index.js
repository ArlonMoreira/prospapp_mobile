import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
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

  //Obter dados do usuário.
  const { loading, userData } = useSelector((state) => state.me);
  const [ accessHome, setAccessHome ] = useState(false);

  //Direcionar pra página Home automaticamente caso estiver associado a uma empresa;
  useEffect(()=>{
    if(!loading && userData){
      if(userData.companys_joined.length == 1){
        setAccessHome(true);
      }
    }
    
  }, [userData, loading]);  

  if(loading){
    return (
      <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F0F4FF'
          }}
        >
        <ActivityIndicator size="large" color="#131313"/>
      </View>      
    )
  }

  return (
    <>
      {
        !loading && auth && accessHome && <AppRoutes/>
      }
      {
        !loading && auth && !accessHome && <Company/>
      }
      {
        !auth && <AuthRoutes/>
      }
    </>

  )
};

export default Routes;