import React from 'react';
import { StyleSheet, KeyboardAvoidingView,  ScrollView, Platform } from 'react-native';
//Hooks
import { useState } from 'react';
//Components
import Header from '../../components/Header';
import InputForm from '../../components/InputForm';
import ButtonLg from '../../components/ButtonLg';
//Styles
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Introduction,
  IntroductionText,
  FormArea,
  RegisterArea,
  Footer,
  RecoverPassword,
  RecoverPasswordButton,
  RecoverPasswordText,
  SubmitButton,
  RegisterAreaLabel
} from './styles';

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    console.log(email)
    console.log(password)
  };

  return (
    <LinearGradient colors={['#008C81', '#0C6661']} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} keyboardVerticalOffset={0}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

            <Header/>

            <Introduction>
              <IntroductionText>
                Preencha os campos abaixo para acessar.
              </IntroductionText>
            </Introduction>

            <FormArea>
              <InputForm label='Digite seu e-mail' setValue={setEmail} value={email}/>
              <InputForm label='Digite sua senha' setValue={setPassword} value={password}/>
              <RecoverPassword>
                <RecoverPasswordButton>
                  <RecoverPasswordText>Esqueceu a senha ?</RecoverPasswordText>
                </RecoverPasswordButton>
              </RecoverPassword>
              <SubmitButton>
                <ButtonLg title="entrar" action={handleAuth}/>
              </SubmitButton>
            </FormArea>

            <RegisterArea>
              <RegisterAreaLabel>Não possui uma conta ?</RegisterAreaLabel>
            </RegisterArea>

            <Footer/>

          </ScrollView>
      </KeyboardAvoidingView>
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