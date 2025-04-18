import React, { useEffect, useRef } from 'react'
import { KeyboardAvoidingView, Platform, Text, BackHandler } from 'react-native';
import { useState } from 'react';
//Redux
import { register } from '../../slices/codeSlice';
import { setUserAuth } from '../../slices/authSlice';
import { resetState } from '../../slices/codeSlice';
//hooks
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
//Components
import Footer from '../../components/Footer';
import ButtonLg from '../../components/ButtonLg';
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
    //Dispatch
    const dispatch = useDispatch();
    const { loading, data } = useSelector((state) => state.code);

    useEffect(() => {
        dispatch(resetState());

        const backAction = () => {
            return true; // retorna true para impedir a ação
        };
    
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
    
        return () => backHandler.remove();

    }, []);

    //Obter dados parâmetros
    const { email } = route.params;

    const [ code, setCode ] = useState();
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

    //Enviar código
    const handleSendCode = () => {
        dispatch(register({
            code, email
        }));
    };

    useEffect(() => {
        if(data && Object.keys(data).length > 0){
            dispatch(setUserAuth(data));
            dispatch(resetState());
        }
    }, [data]);

    return (
        <LinearGradient
        colors={['#008C81', '#0C6661']}
        style={{
            flex: 1,
            paddingTop: 20
        }}
        >
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'os' ? 'padding': 'height'} 
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }} 
            keyboardVerticalOffset={0}>
            <TitleArea>
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
                <RecoverCodeLink>
                    <Text style={{ color: '#fff', opacity: .5, fontSize: 14, fontFamily: 'montserrat-regular' }}>REENVIAR CÓDIGO</Text>
                </RecoverCodeLink>
            </RecoverCode>
            <ButtonSendArea>
                <ButtonLg disabled={loading} loading={loading} title='Confirmar' color='#fff' fontColor='#0C6661' largeWidth={350} action={() => handleSendCode()}/>
            </ButtonSendArea>
        </KeyboardAvoidingView>
        <Footer/>
        </LinearGradient>
    )
};

export default CodeVerificationRegister;