import React from 'react';
import { StyleSheet } from 'react-native';
//Styles
import { LinearGradient } from 'expo-linear-gradient';
import { 
  LogoArea,
  Container,
  Logo,
  LogoTitle
} from './styles';

const Login = () => {

  return (
    <LinearGradient
      colors={['#008C81', '#0C6661']}
      style={styles.background}
      >
      <LogoArea>
        <Logo source={require('../../../assets/logo-2.png')}/>
        <LogoTitle>Bem vindo(a) ao ProspApp!</LogoTitle>
      </LogoArea>
      <Container>

      </Container>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    paddingTop: 20
  }
})

export default Login;