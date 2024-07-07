import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Platform, ScrollView } from 'react-native';
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
  SubmitButton
} from './styles';

const Register = () => {

  //Formulário de cadastro
  const [ full_name, setFullName] = useState('');
  const [ doc_number, setDocNumber ] = useState('');
  const [ email, setEmail] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirm_password, setConfirmPassword ] = useState('');

  const handleSubmit = () => {

  };

  return (
    <LinearGradient
      colors={['#008C81', '#0C6661']}
      style={styles.background}    
      >
      <Header/>
      <KeyboardAvoidingView behavior={Platform.OS === 'os' ? 'padding': 'height'} style={{flex: 1}} keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          <Introduction>
            <IntroductionText>
              Preencha os campos abaixo para cadastro.
            </IntroductionText>
          </Introduction>

          <FormArea>
            <InputForm label='Nome completo' setValue={setFullName} value={full_name} secureTextEntry={false}/>
            <InputForm label='CPF' setValue={setDocNumber} value={doc_number} secureTextEntry={false}/>
            <InputForm label='E-mail' setValue={setEmail} value={email} secureTextEntry={false}/>
            <InputForm label='Senha' setValue={setPassword} value={password} secureTextEntry={true}/>
            <InputForm label='Confirmar Senha' setValue={setConfirmPassword} value={confirm_password} secureTextEntry={true}/>
            <SubmitButton>
              <ButtonLg title="cadastrar" action={handleSubmit}></ButtonLg>
            </SubmitButton>
          </FormArea>
          
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

export default Register;