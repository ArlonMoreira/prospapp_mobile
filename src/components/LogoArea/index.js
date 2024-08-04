import React from 'react'
//Styles
import { 
    Container,
    Logo,
    LogoText
} from './styles';

const LogoArea = () => {
  return (
    <Container>
      <Logo source={require('../../../assets/logo-2.png')}></Logo>
      <LogoText>ProspApp</LogoText>
    </Container>
  )
}

export default LogoArea;