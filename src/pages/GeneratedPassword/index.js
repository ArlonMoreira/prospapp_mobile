import React, { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, View } from 'react-native';
//Redux
import { reset, resetForm, resetErrorMessage } from '../../slices/resetPasswordSlice';
import { resetRecoverPassword } from '../../slices/authSlice';
//Hooks
import { useDispatch, useSelector } from 'react-redux';
import useKeyboardStatus from '../../hooks/useKeyboardStatus';
import useDisableBackHandler from '../../hooks/useDisableBackHandler';
//Components
import Footer from '../../components/Footer';
import InputForm from '../../components/InputForm';
import ButtonLg from '../../components/ButtonLg';
import Alert from '../../components/Alert';
//Styles
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Errors,
  Error
} from '../Register/styles';
import { 
    TitleArea,
    Title,
    Instruction,
    ButtonSendArea
  } from '../CodeVerificationRegister/styles';

const GeneratedPassword = () => {

  //Não é possível voltar pra página anterior
  useDisableBackHandler();

  //Hooks que identifica se o teclado está aberto
  const keyboardOpen = useKeyboardStatus();   

  const dispatch = useDispatch();
  const { success, loading, errorMessage, errors } = useSelector(state => state.resetPassword);

  const inputPasswordRef = useRef();
  const [ password, setPassword ] = useState('');
  const [ confirm_password, setConfirmPassword ] = useState('');

  useEffect(() => {
    inputPasswordRef.current?.focus();
    dispatch(resetForm()); //Localizado em resetPasswordSlice.js Irá reiniciar o estado da reiniciação de senha;

  }, []);

  const handleChangePassword = () => {
    const body = {
      password,
      confirm_password      
    };

    dispatch(reset(body));

  };

  //Alerta de erros
  const [showAlertError, setShowAlertError] = useState(false);

  //Caso tiver mensagem erro eu apresento o alerta, caso contrário, não apresento o alerta.
  useEffect(()=>{
      if(errorMessage){
          setShowAlertError(true);
      } else {
          setShowAlertError(false);
      }

  }, [errorMessage, setShowAlertError]);

  //A primeira vez que ocorre a falha de autenticação a mensagem de erro é preenchida e é exibida através do código acima. Pois, a apresentação
  //da mensagem ocorre baseado na leitura da mensagem de erro.
  //O problema ocorre quando ocorre um segundo erro, pois o código acima fica escutando a variavel errorMessage, e como nenhum mudança ocorreu. O código acima não é acionado.
  //Por conta disso, preciso limpar a mensagem sempre que o alerta de erro de autenticação for fechado.
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

  useEffect(() => {
    if(success){
      dispatch(resetRecoverPassword()); //Localizado em authSlice.js Irá reiniciar o estado de não recuperação de senha.
      dispatch(resetForm()); //Localizado em resetPasswordSlice.js Irá reiniciar o estado da reiniciação de senha;
    }

  }, [success]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <LinearGradient
          colors={['#008C81', '#0C6661']}
          style={{ flex: 1, paddingLeft: 8, paddingRight: 8 }}
        >
          {showAlertError && <Alert message={errorMessage} setShow={setShowAlertError} />}
          <View style={{ flex: 1, paddingTop: 20 }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <TitleArea>
                    <Title>Recuperar senha</Title>
                    <Instruction>Por favor, escolha uma nova senha.</Instruction>
                </TitleArea>
                <View style={{width: '100%'}}>
                  <InputForm element={inputPasswordRef} label='Senha' value={password} setValue={setPassword} secureTextEntry={true}/>          
                  <Errors>
                    {
                      errors.password && errors.password.map((error, i) => <Error key={i}>{error}</Error>)
                    }
                  </Errors>          
                </View>
                <View style={{width: '100%'}}>
                  <InputForm label='Confirmar senha' value={confirm_password} setValue={setConfirmPassword} secureTextEntry={true}/>
                  <Errors>
                    {
                      errors.confirm_password && errors.confirm_password.map((error, i) => <Error key={i}>{error}</Error>)
                    }
                  </Errors>          
                </View>
                <ButtonSendArea style={{alignItems: 'center', justifyContent: 'center'}}>
                  <ButtonLg title='Confirmar' action={() => handleChangePassword()} largeWidth={350} loading={loading} disabled={loading}/>
                </ButtonSendArea>       
              </View>
              {!keyboardOpen && <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}><Footer /></View>}
            </View>            
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>   
  )
}

export default GeneratedPassword;