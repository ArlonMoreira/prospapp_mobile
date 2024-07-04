import styled from 'styled-components/native';

export const Introduction = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const IntroductionText = styled.Text`
    color: #fff;
    font-size: 22px;
    font-family: 'montserrat-bold';
    text-align: start;
    width: 100%;
    padding: 25px;
`;

export const FormArea = styled.View`
    flex: 3;
    gap: 20px;
    margin: 10px;
`;

export const RecoverPassword = styled.View`
    width: 100%;
    justify-content: center;  
    align-items: flex-end;
    height: 65px;    
`;

export const RecoverPasswordButton = styled.TouchableOpacity`
    justify-content: center;    
    align-items: flex-end;
    width: 50%;
    margin: 15px;    
`;

export const RecoverPasswordText = styled.Text`
    color: #fff;
    font-family: 'montserrat-light';
`;

export const SubmitButton = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const RegisterArea = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;  
`;

export const RegisterAreaLabel = styled.Text`
    color: #fff;
    font-family: 'montserrat-light';
    font-size: 14px;
`

export const Footer = styled.View`
    flex: 1;
`;