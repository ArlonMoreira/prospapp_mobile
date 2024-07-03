import React from 'react';
import { Text, StyleSheet } from 'react-native';
//Components
import Header from '../../components/Header';
//Styles
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Introduction,
  IntroductionText,
  FormArea,
  RegisterArea,
  Footer
} from './styles';

const SignIn = () => {
  return (
    <LinearGradient
      colors={['#008C81', '#0C6661']}
      style={styles.background}    
      >
      <Header/>
      <Introduction>
        <IntroductionText>
          Preencha os campos abaixo para acessar.
        </IntroductionText>
      </Introduction>
      <FormArea/>
      <RegisterArea/>
      <Footer/>
    </LinearGradient>
  )
};

const styles = StyleSheet.create({
  background:{
    flex: 1,
    paddingTop: 20
  }
});

export default SignIn;