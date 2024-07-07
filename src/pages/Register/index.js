import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Platform, ScrollView } from 'react-native';
//Hooks
import { useDispatch, useSelector } from 'react-redux';
//Redux
import { register, resetErrorMessage } from '../../slices/registerSlice';
//Components
import Header from '../../components/Header';
import InputForm from '../../components/InputForm';
import ButtonLg from '../../components/ButtonLg';
import Footer from '../../components/Footer';
import Alert from '../../components/Alert/alert';
//Styles
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Introduction,
  IntroductionText,
  FormArea,
  SubmitButton
} from './styles';

const Register = () => {

  const { loading, errorMessage, errors } = useSelector((state) => state.register);

  //Formulário de cadastro
  const dispatch = useDispatch();

  const [ full_name, setFullName] = useState('');
  const [ doc_number, setDocNumber ] = useState('');
  const [ email, setEmail] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirm_password, setConfirmPassword ] = useState('');

  const handleSubmit = async () => {
    const data = {
      full_name,
      doc_number,
      email,
      password,
      confirm_password
    };

    await dispatch(register(data));

  };

  //Alert mensagem
  const [showAlertError, setShowAlertError] = useState(false);

  //Apresentar o alert caso tiver mensagem de erro.
  useEffect(()=>{
    if(errorMessage){
      setShowAlertError(true);
    } else {
      setShowAlertError(false);
    }

  }, [errorMessage, setShowAlertError]);

  //Fechar a mensagem de erro automaticamente.
  useEffect(()=>{
    if(!showAlertError){ //Resetar o estado de errorMessage caso não tiver mais visível o alerta.
      dispatch(resetErrorMessage());
    } else { //Caso estiver aberto a mensagem de erro, 1 segundo depois será fechada sozinha.
      const timeoutClearMessage = setTimeout(()=>{
        dispatch(resetErrorMessage());
      }, 6000);

      return () => {
        clearTimeout(timeoutClearMessage);
      }

    }

  }, [showAlertError]);

  return (
    <LinearGradient
      colors={['#008C81', '#0C6661']}
      style={styles.background}    
      >
      {
        showAlertError && <Alert message={errorMessage} setShow={setShowAlertError}/>
      }
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
              <ButtonLg title="cadastrar" action={handleSubmit} loading={loading} disabled={loading}></ButtonLg>
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