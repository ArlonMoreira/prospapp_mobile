import React from 'react'
//Pages
import Login from '../pages/Login';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
import CodeVerificationRegister from '../pages/CodeVerificationRegister';
import RecoverPassword from '../pages/RecoverPassword';
import GeneratedPassword from '../pages/GeneratedPassword';
//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthRoutes = () => {
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
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false
        }}
      />     
      <Stack.Screen
        name="CodeVerificationRegister"
        component={CodeVerificationRegister}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="RecoverPassword"
        component={RecoverPassword}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="GeneratedPassword"
        component={GeneratedPassword}
        options={{
          headerShown: false
        }}
      />            
    </Stack.Navigator>
  )
}

export default AuthRoutes;