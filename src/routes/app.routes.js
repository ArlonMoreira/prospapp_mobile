import React, { useEffect, useState, useContext } from 'react';
// Hooks
import { useSelector } from 'react-redux';
// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Pages
import Perfil from '../pages/Perfil';
import HomeRoutes from './home.routes';
// Context
import { LoadingContext } from '../contexts/LoadingContext';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  const { loading } = useContext(LoadingContext);
  const { userData } = useSelector((state) => state.me);
  const [primaryColor, setPrimaryColor] = useState('#000');

  useEffect(() => {
    if (userData?.companys_joined?.length) {
      setPrimaryColor(userData.companys_joined[0].primary_color);
    }
  }, [userData]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#fff' },
      }}
    >
      {/* Tela principal */}
      <Stack.Screen name="HomeRoutes" component={HomeRoutes} />

      {/* Tela de perfil */}
      <Stack.Screen name="Perfil" component={Perfil} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
