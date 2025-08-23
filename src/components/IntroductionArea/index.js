import React from 'react'
//Styles
import { Container, Instruction } from './styles';

const InstructionArea = ({ text }) => {
  return (
    <Container>
        <Instruction>{ text }</Instruction>
    </Container>
  )
}

export default InstructionArea;