import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Login = () => {
  return (
    <LinearGradient
      colors={['#008C81', '#0C6661']}
      style={styles.background}
      >
      <Text>Login</Text>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'    
  }
})

export default Login;