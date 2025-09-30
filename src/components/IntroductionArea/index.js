import React from 'react'
//Styles
import { Container, Instruction } from './styles';
import { Ionicons } from '@expo/vector-icons';

const InstructionArea = ({ text, marginTop=10, width=276 }) => {
  return (
    <Container style={{ marginTop }}>
      <Ionicons name={'alert-circle-outline'} size={32} color={'#606060'} />                      
      <Instruction style={{ width }}>{ text }</Instruction>
    </Container>
  )
}

export default InstructionArea;