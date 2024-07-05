import React from 'react';
import { StyleSheet, KeyboardAvoidingView,  ScrollView, Platform } from 'react-native';
//Hooks
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
//Redux
import { signin } from '../../slices/authSlice';
//Components
import Header from '../../components/Header';
import InputForm from '../../components/InputForm';
import ButtonLg from '../../components/ButtonLg';
import Footer from '../../components/Footer';
//Styles
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Introduction,
  IntroductionText,
  FormArea,
  RegisterArea,
  RecoverPassword,
  RecoverPasswordButton,
  RecoverPasswordText,
  SubmitButton,
  RegisterAreaLabel,
  LinkRegister,
  LinkRegisterText
} from './styles';

const SignIn = () => {

  //Dispatch redux para realizar autenticação
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {

    const data = {
      email,
      password
    };

    //Autenticação
    await dispatch(signin(data));

  };

  return (
    <LinearGradient colors={['#008C81', '#0C6661']} style={styles.background}>
      <Header/>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={{ flexGrow: 2 }}>
          
          <Introduction>
            <IntroductionText>
              Preencha os campos abaixo para acessar.
            </IntroductionText>
          </Introduction>

          <FormArea>
            <InputForm label='Digite seu e-mail' setValue={setEmail} value={email} secureTextEntry={false}/>
            <InputForm label='Digite sua senha' setValue={setPassword} value={password} secureTextEntry={true}/>
            <RecoverPassword>
              <RecoverPasswordButton>
                <RecoverPasswordText>Esqueceu a senha ?</RecoverPasswordText>
              </RecoverPasswordButton>
            </RecoverPassword>
            <SubmitButton>
              <ButtonLg title="entrar" action={handleSubmit}/>
            </SubmitButton>            
          </FormArea>

          <RegisterArea>
            <RegisterAreaLabel>Não possui uma conta?</RegisterAreaLabel>
            <LinkRegister onPress={() => navigation.navigate('Register')}>
              <LinkRegisterText>Cadastre-se agora!</LinkRegisterText>
            </LinkRegister>
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