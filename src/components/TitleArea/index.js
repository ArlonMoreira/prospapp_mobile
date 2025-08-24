import React from 'react'
//Styles
import { Container, TitlePage, SubTitlePage } from './styles';

const TitleArea = ({ title, color, subtitle }) => {
  return (
    <Container>
        <TitlePage style={{ color }}>{ title }</TitlePage>
        {
          subtitle && (<SubTitlePage> { subtitle } </SubTitlePage>)
        }
    </Container>
  )
}

export default TitleArea;