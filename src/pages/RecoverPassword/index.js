import { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, View } from 'react-native';
//Redux
import { refresh, resetErrorMessage, resetState } from '../../slices/codeRefresh';
//Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import useKeyboardStatus from '../../hooks/useKeyboardStatus';
//Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import InputForm from '../../components/InputForm';
import ButtonLg from '../../components/ButtonLg';
import Alert from '../../components/Alert';
//Styles
import { LinearGradient } from 'expo-linear-gradient';
import { 
  TitleArea,
  Title,
  Instruction,
  ButtonSendArea
} from '../CodeVerificationRegister/styles';

const RecoverPassword = () => {

  const keyboardOpen = useKeyboardStatus(); 

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { loading, success, errorMessage } = useSelector(state => state.codeRefresh);

  const [ email, setEmail ] = useState('');
  const input = useRef();

  useEffect(() => {
    dispatch(resetState());
    //input.current?.focus();
  }, []);

  const handleGeneratedCode = () => {
    dispatch(refresh(email));
  };

  //Navegar pra página que recupera a senha.
  useEffect(() => {
    if(success){
      setEmail('');      
      dispatch(resetState());

      navigation.navigate('CodeVerificationRegister', {
        email,
        recover_password: true
      });

    }

  }, [success]);

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <LinearGradient
          colors={['#008C81', '#0C6661']}
          style={{ flex: 1, paddingLeft: 8, paddingRight: 16 }}
        >
          {showAlertError && <Alert message={errorMessage} setShow={setShowAlertError} />}
    
          <View style={{ flex: 1, paddingTop: 20 }}>
            {!keyboardOpen && (
              <View style={{ position: 'absolute', top: 20, left: 0, right: 0 }}>
                <Header handlePerfil={false}/>
              </View>
            )}
    
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TitleArea>
                <Title>Recuperar senha</Title>
                <Instruction>
                  Por favor, insira seu e-mail para recuperação. Um código de verificação será encaminhado para o endereço de e-mail cadastrado.
                </Instruction>
              </TitleArea>
              <InputForm element={input} label="E-mail" value={email} setValue={setEmail} />
              <ButtonSendArea style={{ alignItems: 'center', justifyContent: 'center' }}>
                <ButtonLg
                  title="Gerar código"
                  action={handleGeneratedCode}
                  loading={loading}
                  disabled={loading}
                  largeWidth={340}
                />
              </ButtonSendArea>
            </View>
    
            {!keyboardOpen && (
              <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                <Footer />
              </View>
            )}
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );

}

export default RecoverPassword;