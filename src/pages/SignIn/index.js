import React, { useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView,  ScrollView, Platform, Keyboard, } from 'react-native';
//Hooks
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
//Redux
import { signin, resetErrorMensage } from '../../slices/authSlice';
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

  //disabilitar botão de submit
  const [disabledButton, setDisabledButton] = useState(true);

  //Dispatch redux para realizar autenticação
  const dispatch = useDispatch();
  const { loading, errorMensage } = useSelector((state) => state.auth);

  //Usado para navegação
  const navigation = useNavigation();

  //Formulário de autenticação
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

  //Alerta de erros
  const [showAlertError, setShowAlertError] = useState(false);

  //Caso tiver mensagem erro eu apresento o alerta, caso contrário, não apresento o alerta.
  useEffect(()=>{
    if(errorMensage){
      setShowAlertError(true);           
    } else {
      setShowAlertError(false);        
    }    

  }, [errorMensage, setShowAlertError]);

  //A primeira vez que ocorre a falha de autenticação a mensagem de erro é preenchida e é exibida através do código acima. Pois, a apresentação
  //da mensagem ocorre baseado na leitura da mensagem de erro.
  //O problema ocorre quando ocorre um segundo erro, pois o código acima fica escutando a variavel errorMensage, e como nenhum mudança ocorreu. O código acima não é acionado.
  //Por conta disso, preciso limpar a mensagem sempre que o alerta de erro de autenticação for fechado.
  useEffect(()=>{
    if(!showAlertError){
      dispatch(resetErrorMensage()); 

    } else {
      const timeOutClearMensage = setTimeout(()=>{
        dispatch(resetErrorMensage());
      }, 6000);

      return () => {
        clearTimeout(timeOutClearMensage);
      }

    }

  }, [showAlertError]);

  //Disabilitar botão caso os campos não tiverem sido preenchidos
  useEffect(()=>{
    if(email == '' || password == ''){
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }

  }, [email, password]);

  //Sumir certos elementos quando abrir o teclado.
  const [showElements, setShowElements] = useState(true);

  useEffect(()=>{
    Keyboard.addListener('keyboardDidShow', () => {
      setShowElements(false); 
    });

    Keyboard.addListener('keyboardDidHide', () => {
      setShowElements(true);
    });    

  }, []);
  return (
    <LinearGradient colors={['#008C81', '#0C6661']} style={styles.background}>
      <Header/>
      {
        showAlertError && <Alert message={errorMensage} setShow={setShowAlertError}/>
      }
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={{ flexGrow: 2 }}>
          
          {
            showElements && (
              <Introduction>
                <IntroductionText>
                  Preencha os campos abaixo para acessar.
                </IntroductionText>
              </Introduction>      
            )
          }

          <FormArea>
            <InputForm label='Digite seu e-mail' setValue={setEmail} value={email} secureTextEntry={false}/>
            <InputForm label='Digite sua senha' setValue={setPassword} value={password} secureTextEntry={true}/>
            <RecoverPassword>
              <RecoverPasswordButton>
                <RecoverPasswordText>Esqueceu a senha ?</RecoverPasswordText>
              </RecoverPasswordButton>
            </RecoverPassword>
            <SubmitButton>
              <ButtonLg title="entrar" action={handleSubmit} loading={loading} disabled={disabledButton}/>
            </SubmitButton>            
          </FormArea>

          {
            showElements && (
              <RegisterArea>
                <RegisterAreaLabel>Não possui uma conta?</RegisterAreaLabel>
                <LinkRegister onPress={() => navigation.navigate('Register')}>
                  <LinkRegisterText>Cadastre-se agora!</LinkRegisterText>
                </LinkRegister>
              </RegisterArea>               
            )
          }
 
          {
            showElements && (
              <Footer/>
            )
          }

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