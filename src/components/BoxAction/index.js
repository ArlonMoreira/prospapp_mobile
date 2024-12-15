import React, { useEffect } from 'react'
//Styles
import { Container, Title } from './styles';
import { Ionicons } from '@expo/vector-icons'; 

const BoxAction = ({action, iconName, color, title, backgroundColor}) => {
  return (
    <Container borderColor={color} onPress={action} backgroundColor={backgroundColor}>
      <Ionicons name={iconName} size={24} color={color}/>
      <Title style={{color: color}}>{title}</Title>
    </Container>
  )
}

export default BoxAction;