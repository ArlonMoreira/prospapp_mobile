import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Platform, ScrollView, Keyboard } from 'react-native';
//Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
//Redux
import { register, resetErrorMessage, resetForm } from '../../slices/registerSlice';
//Components
import Header from '../../components/Header';
import InputForm from '../../components/InputForm';
import ButtonLg from '../../components/ButtonLg';
import Alert from '../../components/Alert';
//Styles
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Introduction,
  IntroductionText,
  FormArea,
  SubmitButton,
  ItemFormArea,
  Errors,
  Error
} from './styles';

const Register = () => {

  const { loading, errorMessage, errors, success } = useSelector((state) => state.register);

  //Formulário de cadastro
  const dispatch = useDispatch();

  const [ full_name, setFullName] = useState('Arlon da Silva Minsait');
  const [ doc_number, setDocNumber ] = useState('93781723003');
  const [ email, setEmail] = useState('asmoreira@minsait.com');
  const [ password, setPassword ] = useState('1Ndr@123*');
  const [ confirm_password, setConfirmPassword ] = useState('1Ndr@123*');

  const handleSubmit = async () => {
    const data = {
      full_name,
      doc_number: doc_number.replace(/\D/g, ""),
      email,
      password,
      confirm_password
    };

    navigation.navigate('CodeVerificationRegister', {
      email
    });

    console.log(data);

    // await dispatch(register(data));

  };

  //Navegar para página de login quando autenticado.
  const navigation = useNavigation();

  useEffect(()=>{
    if(success){
      setFullName('');
      setDocNumber('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');       
      navigation.navigate('SignIn');
    }

  }, [success]);

  //Limpar formulário assim que acessar a página de cadastro.
  useEffect(()=>{   
    dispatch(resetForm());

  }, []);  

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

          {
            showElements && (
              <Introduction>
                <IntroductionText>
                  Preencha os campos abaixo para cadastro.
                </IntroductionText>
              </Introduction>
            )
          }

          <FormArea>
            <ItemFormArea>
              <InputForm label='Nome completo' setValue={setFullName} value={full_name} secureTextEntry={false}/>
              <Errors>
                { 
                  Object.keys(errors).length > 0 && 
                  Array.isArray(errors?.full_name) && 
                  errors.full_name.map((error, i) => <Error key={i}>{error}</Error>) 
                }
              </Errors>
            </ItemFormArea>
            <ItemFormArea>
              <InputForm label='CPF' setValue={setDocNumber} value={doc_number} secureTextEntry={false} cpfMask={true}/>
              <Errors>
                { 
                  Object.keys(errors).length > 0 && 
                  Array.isArray(errors?.doc_number) && 
                  errors.doc_number.map((error, i) => <Error key={i}>{error}</Error>) 
                }
              </Errors>
            </ItemFormArea>
            <ItemFormArea>
              <InputForm label='E-mail' setValue={setEmail} value={email} secureTextEntry={false}/>
              <Errors>
                { 
                  Object.keys(errors).length > 0 && 
                  Array.isArray(errors?.email) && 
                  errors.email.map((error, i) => <Error key={i}>{error}</Error>) 
                }
              </Errors>            
            </ItemFormArea>
            <ItemFormArea>
              <InputForm label='Senha' setValue={setPassword} value={password} secureTextEntry={true}/>
              <Errors>
                { 
                  Object.keys(errors).length > 0 && 
                  Array.isArray(errors?.password) && 
                  errors.password.map((error, i) => <Error key={i}>{error}</Error>) 
                }
              </Errors>
            </ItemFormArea>
            <ItemFormArea>
              <InputForm label='Confirmar Senha' setValue={setConfirmPassword} value={confirm_password} secureTextEntry={true}/>
              <Errors>
                { 
                  Object.keys(errors).length > 0 && 
                  Array.isArray(errors?.confirm_password) && 
                  errors.confirm_password.map((error, i) => <Error key={i}>{error}</Error>) 
                }
              </Errors>
            </ItemFormArea>
            <SubmitButton>
              <ButtonLg title="cadastrar" action={handleSubmit} loading={loading} disabled={loading}></ButtonLg>
            </SubmitButton>
          </FormArea>

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