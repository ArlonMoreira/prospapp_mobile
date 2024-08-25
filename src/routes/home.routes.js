import React from 'react'
//Pages
import Home from '../pages/Home';
import ElectronicCall from '../pages/ElectronicCall';
import ElectronicPoint from '../pages/ElectronicPoint';
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
    </Stack.Navigator>
  )
}

export default HomeRoutes;