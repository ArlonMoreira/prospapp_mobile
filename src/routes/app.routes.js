import React from 'react'
//Pages
import Home from '../pages/Home';
//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={Home}
            options={{
                headerShown: false
            }}
        />    
    </Stack.Navigator>
  )
}

export default AppRoutes;