import React from 'react'
//Pages
import Home from '../pages/Home';
import ElectronicCall from '../pages/ElectronicCall';
import ElectronicPoint from '../pages/ElectronicPoint';
import Call from '../pages/Call';
import Point from '../pages/Point';
import AddUser from '../pages/ElectronicCall/AddUser';
import RegisterLocal from '../pages/ElectronicPoint/RegisterLocal';
//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeRoutes = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ElectronicCall"
        component={ElectronicCall}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ElectronicPoint"
        component={ElectronicPoint}
        options={{
          headerShown: false
        }}
      />    
      <Stack.Screen
        name="Call"
        component={Call}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Point"
        component={Point}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="AddUser"
        component={AddUser}
        options={{
          headerShown: false
        }}
      />      
      <Stack.Screen
        name="RegisterLocalPoint"
        component={RegisterLocal}
        options={{
          headerShown: false
        }}
      />                                     
    </Stack.Navigator>
  )
}

export default HomeRoutes;