import React, { useEffect, useState } from 'react'
//Redux
import { useSelector } from 'react-redux';
//Styles
import Feather from 'react-native-vector-icons/Feather';
//Pages
import Home from '../pages/Home';
import Perfil from '../pages/Perfil';
//Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const AppRoutes = () => {

  const { userData } = useSelector((state) => state.me);
  const [ primaryColor, setPrimaryColor ] = useState('#000');
  
  useEffect(()=>{
    if(userData){
      if(userData.companys_joined.length){
        setPrimaryColor(userData.companys_joined[0].primary_color);
      }  
    }
  }, [userData]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: primaryColor,
        tabBarStyle:{
          backgroundColor: '#fff',
          borderTopWidth: 0
        }

      }}    
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="home" color={color} size={size} />
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="user" color={color} size={size} />
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default AppRoutes;