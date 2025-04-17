import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
//Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
//Styles
import { LinearGradient } from 'expo-linear-gradient';
import { 
    Title,
    TitleArea,
    Instruction,
    CodeArea,
    NumberInput
} from './styles';

const CodeVerificationRegister = ({ route }) => {

    const { email } = route.params;

    const [n1, setN1] = useState(null);
    const [n2, setN2] = useState(null);
    const [n3, setN3] = useState(null);
    const [n4, setN4] = useState(null);
    const [n5, setN5] = useState(null);
    const [n6, setN6] = useState(null); 

    return (
        <LinearGradient
        colors={['#008C81', '#0C6661']}
        style={{
            flex: 1,
            paddingTop: 20
        }}
        >
        <Header/>
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
                <Instruction>Por favor, entre com o código de verificação enviado apra o e-mail: { email }</Instruction>
            </TitleArea>
            <CodeArea>
                <NumberInput onChange={(value) => setN1(value)} value={n1} keyboardType='numeric' cursorColor='#fff'></NumberInput>
                <NumberInput onChange={(value) => setN2(value)} value={n2} keyboardType='numeric' cursorColor='#fff'></NumberInput>
                <NumberInput onChange={(value) => setN3(value)} value={n3} keyboardType='numeric' cursorColor='#fff'></NumberInput>
                <NumberInput onChange={(value) => setN4(value)} value={n4} keyboardType='numeric' cursorColor='#fff'></NumberInput>
                <NumberInput onChange={(value) => setN5(value)} value={n5} keyboardType='numeric' cursorColor='#fff'></NumberInput>
                <NumberInput onChange={(value) => setN6(value)} value={n6} keyboardType='numeric' cursorColor='#fff'></NumberInput>
            </CodeArea>
        </KeyboardAvoidingView>
        <Footer/>
        </LinearGradient>
    )
};

export default CodeVerificationRegister;