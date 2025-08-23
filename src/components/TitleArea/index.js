import React from 'react'
//Styles
import { Container, TitlePage } from './styles';

const TitleArea = ({ text, color }) => {
  return (
    <Container>
        <TitlePage style={{ color }}>{ text }</TitlePage>
    </Container>
  )
}

export default TitleArea;