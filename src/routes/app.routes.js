import React, { useEffect, useState, useContext } from 'react'
//Hooks
import { useSelector } from 'react-redux';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
//Styles
import Feather from 'react-native-vector-icons/Feather';
//Pages
import Perfil from '../pages/Perfil';
//Navigation
import HomeRoutes from './home.routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Context
import { LoadingContext } from '../contexts/LoadingContext';

const Tab = createBottomTabNavigator();

const AppRoutes = () => {
  const { loading } = useContext(LoadingContext);
  const { userData } = useSelector((state) => state.me);
  const [ primaryColor, setPrimaryColor ] = useState('#000');

  useEffect(() => {
    if (userData?.companys_joined?.length) {
      setPrimaryColor(userData.companys_joined[0].primary_color);
    }
  }, [userData]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: primaryColor,
      }}
    >
      <Tab.Screen
        name="HomeRoutes"
        component={HomeRoutes}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

          return {
            tabBarStyle: [
              {
                backgroundColor: '#fff',
                borderTopWidth: 0,
              },
              loading || routeName !== 'Home' ? { display: 'none' } : {},
            ],
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" color={color} size={size} />
            ),
          };
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarStyle: loading ? { display: 'none' } : {
            backgroundColor: '#fff',
            borderTopWidth: 0,
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppRoutes;
