import React from 'react'
import Constants from 'expo-constants';
//Styles
import { 
    Container,
    Logo,
    LogoText
} from './styles';
const appVersion = Constants.expoConfig.version;

const Footer = () => {
  return (
    <Container>
        <Logo source={require('../../../assets/logo-3.png')}></Logo>
        <LogoText>{appVersion}</LogoText>
    </Container>
  )
}

export default Footer;