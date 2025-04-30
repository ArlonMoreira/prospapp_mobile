import React, { useEffect, useRef } from 'react'
import { KeyboardAvoidingView, Platform, Text, View, Keyboard } from 'react-native';
import { useState } from 'react';
//Redux
import { register } from '../../slices/codeSlice';
import { setUserAuth } from '../../slices/authSlice';
import { resetState } from '../../slices/codeSlice';
import { resetErrorMessage } from '../../slices/codeSlice';
import { refresh } from '../../slices/codeRefresh';
//hooks
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import useKeyboardStatus from '../../hooks/useKeyboardStatus';
import useDisableBackHandler from '../../hooks/useDisableBackHandler';
//Components
import Footer from '../../components/Footer';
import ButtonLg from '../../components/ButtonLg';
import Alert from '../../components/Alert';
import LoadingPage from '../../components/LoadingPage';
//Styles
import { LinearGradient } from 'expo-linear-gradient';
import { 
    Title,
    TitleArea,
    Instruction,
    CodeArea,
    NumberInput,
    RecoverCode,
    RecoverCodeLink,
    ButtonSendArea
} from './styles';

const CodeVerificationRegister = ({ route }) => {

    //Obter dados parâmetros
    const { email: emailRoute, recover_password } = route.params;    

    const [ email, setEmail ] = useState('');

    //Não é possível voltar pra página anterior
    useDisableBackHandler();

    //Hooks que identifica se o teclado está aberto
    const keyboardOpen = useKeyboardStatus(); 

    //Usado para navegação
    const navigation = useNavigation();

    //Dispatch
    const dispatch = useDispatch();
    const { loading, data, errorMessage, error } = useSelector((state) => state.code);
    const { recoverPassword } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(resetState());
        setEmail(emailRoute);

    }, []);

    const [ code, setCode ] = useState(null);
    const [n1, setN1] = useState(null);
    const [n2, setN2] = useState(null);
    const [n3, setN3] = useState(null);
    const [n4, setN4] = useState(null);
    const [n5, setN5] = useState(null);
    const [n6, setN6] = useState(null);

    const input1Ref = useRef();
    const input2Ref = useRef();
    const input3Ref = useRef();
    const input4Ref = useRef();
    const input5Ref = useRef();
    const input6Ref = useRef();

    //Preencher código
    useEffect(() => {
        if(n1 && n2 && n3 && n4 && n5 && n6) setCode([n1, n2, n3, n4, n5, n6].join(''));
    }, [n1, n2, n3, n4, n5, n6]);

    //Limpar formulário caso tiver error
    useEffect(() => {
        if(error) {
            setN1(null);
            setN2(null);
            setN3(null);
            setN4(null);
            setN5(null);
            setN6(null);

            input1Ref.current?.focus();
            Keyboard.dismiss();

        }

    }, [error]);

    //Enviar código
    const handleSendCode = () => {
        dispatch(register({
            code, email, recover_password
        }));
    };

    useEffect(() => {
        if(data && Object.keys(data).length > 0){
            dispatch(setUserAuth(data));
            dispatch(resetState());

        }

    }, [data]);

    useEffect(() => {
        if(recoverPassword){
            navigation.navigate('GeneratedPassword');
        }

    }, [recoverPassword]);

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

    //Reenviar código
    const { loading: loadingRefreshCode } = useSelector((state) => state.codeRefresh);

    if(loadingRefreshCode){
        return <LoadingPage backgroundColor={'#0C6661'}/>
    }

    const handleRefreshCode = () => {
        dispatch(refresh(email));
        setN1(null);
        setN2(null);
        setN3(null);
        setN4(null);
        setN5(null);
        setN6(null);
        setCode(null);        
    };
    
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : -50}
        >
            <LinearGradient
                colors={['#008C81', '#0C6661']}
                style={{ flex: 1, paddingLeft: 8, paddingRight: 8 }}
            >
            {showAlertError && <Alert message={errorMessage} setShow={setShowAlertError} />}
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TitleArea style={{ paddingRight: 18 }}>
                            <Title>Confirmação</Title>
                            <Instruction>Por favor, entre com o código de verificação enviado para o e-mail: { email }</Instruction>
                        </TitleArea>
                        <CodeArea>
                            <NumberInput
                                ref={input1Ref}
                                onChangeText={(value) => {
                                    setN1(value);
                                    if(value.length === 1) input2Ref.current?.focus();
                                }}
                                value={n1}
                                keyboardType='numeric'
                                cursorColor='#fff'
                                maxLength={1}
                            ></NumberInput>
                            <NumberInput 
                                ref={input2Ref}
                                onChangeText={(value) => {
                                    setN2(value);
                                    value.length === 1? input3Ref.current?.focus(): input1Ref.current?.focus();
                                }}
                                value={n2}
                                keyboardType='numeric'
                                cursorColor='#fff'
                                maxLength={1}
                            ></NumberInput>
                            <NumberInput
                                ref={input3Ref}
                                onChangeText={(value) => {
                                    setN3(value);
                                    value.length === 1? input4Ref.current?.focus(): input2Ref.current?.focus();
                                }}
                                value={n3}
                                keyboardType='numeric'
                                cursorColor='#fff'
                                maxLength={1}
                            ></NumberInput>
                            <NumberInput
                                ref={input4Ref}
                                onChangeText={(value) => {
                                    setN4(value);
                                    value.length === 1? input5Ref.current?.focus(): input3Ref.current?.focus();
                                }}
                                value={n4}
                                keyboardType='numeric'
                                cursorColor='#fff'
                                maxLength={1}
                            ></NumberInput>
                            <NumberInput
                                ref={input5Ref}
                                onChangeText={(value) => {
                                    setN5(value);
                                    value.length === 1? input6Ref.current?.focus(): input4Ref.current?.focus();
                                }}
                                value={n5}
                                keyboardType='numeric'
                                cursorColor='#fff'
                                maxLength={1}
                            ></NumberInput>
                            <NumberInput
                                ref={input6Ref}
                                onChangeText={(value) => {
                                    setN6(value);
                                    value.length === 0 && input5Ref.current?.focus();
                                }}
                                value={n6}
                                keyboardType='numeric'
                                cursorColor='#fff'
                                maxLength={1}
                            ></NumberInput>
                        </CodeArea>
                        <RecoverCode>
                            <RecoverCodeLink onPress={() => handleRefreshCode()}>
                                <Text style={{ color: '#fff', opacity: .65, fontSize: 14, fontFamily: 'montserrat-bold' }}>REENVIAR CÓDIGO</Text>
                            </RecoverCodeLink>
                        </RecoverCode>
                        <ButtonSendArea style={{alignItems: 'center', justifyContent: 'center'}}>
                            <ButtonLg largeWidth={346} disabled={loading} loading={loading} title='Confirmar' color='#fff' fontColor='#0C6661' action={() => handleSendCode()}/>
                        </ButtonSendArea>
                    </View>
                    {!keyboardOpen && <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}><Footer /></View>}
                </View>            
            </LinearGradient>
        </KeyboardAvoidingView>       
    );
};

export default CodeVerificationRegister;