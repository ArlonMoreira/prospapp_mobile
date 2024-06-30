import React from 'react';
//Pages
import Login from '../pages/Login';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{

        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{

        }}
      />      
    </Stack.Navigator>
  )
}

export default Routes;