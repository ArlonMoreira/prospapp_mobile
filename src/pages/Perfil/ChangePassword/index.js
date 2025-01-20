import React from 'react'
//Styles
import { Container } from './styles';

const ChangePassword = ({ route }) => {

    const { color } = route.params;

    return (
      <Container style={{ backgroundColor: color }}>
      </Container>
    )
}

export default ChangePassword;