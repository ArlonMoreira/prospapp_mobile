import React from 'react'
//Styles
import { Container, Instruction } from './styles';
import { Ionicons } from '@expo/vector-icons';

const InstructionArea = ({ text }) => {
  return (
    <Container>
      <Ionicons name={'alert-circle-outline'} size={32} color={'#606060'} />                      
      <Instruction>{ text }</Instruction>
    </Container>
  )
}

export default InstructionArea;