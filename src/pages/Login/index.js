import React from 'react';
import { StyleSheet, View } from 'react-native';
//Hooks
import { useNavigation } from '@react-navigation/native';
//Container
import ButtonLg from '../../components/ButtonLg';
import ButtonLgLight from '../../components/ButtonLgLight';
import Footer from '../../components/Footer';
//Styles
import { LinearGradient } from 'expo-linear-gradient';
import { 
  LogoArea,
  Container,
  Logo,
  LogoTitle
} from './styles';

const Login = () => {

  const navigation = useNavigation();

  const accessSignIn = () => {
    navigation.navigate('SignIn');
  };

  const accessRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <LinearGradient
      colors={['#008C81', '#0C6661']}
      style={styles.background}
      >
      <LogoArea>
        <Logo source={require('../../../assets/logo-3.png')}/>
        <LogoTitle>Bem vindo a Prospere!</LogoTitle>
      </LogoArea>
      <Container>
        <ButtonLg title="Entrar" action={accessSignIn}/>
        <View style={styles.buttonSpacing}/>
        <ButtonLgLight title="criar conta" action={accessRegister}/>
      </Container>
      <Footer></Footer>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    paddingTop: 20
  },
  buttonSpacing: {
    height: 20,
  }  
});

export default Login;