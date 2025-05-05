import React, { useEffect, useState } from 'react'
import { Text } from 'react-native';
//Components
import Header from '../../components/Header';
//Styles
import { StatusBar } from 'expo-status-bar';
import { Container } from '../ElectronicCall/styles';
import { ScrollArea, TitleArea, ButtonsArea, ButtonPoint, ButtonsAreaIcon } from './styles';
import { Instruction } from '../ElectronicCall/ListClass/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Point = ({ route }) => {

  const [ color, setColor ] = useState(null);
  const [ data, setData ] = useState([]);

  useEffect(() => {
    setColor(route.params.color);
    setData(route.params.data);

    console.log(route.params.data)
  }, []);

  return (
    <Container>
      <StatusBar 
        translucent
        backgroundColor="transparent"
      />      
      <Header themeColor={color}/>
      <ScrollArea>
        <TitleArea>
          <Instruction>Registrar ponto no local:</Instruction>
          <Text style={{fontFamily: 'montserrat-bold', fontSize: 22, color: color}}>{data ? data.name : '-'}</Text>
        </TitleArea>
        <ButtonsArea>
          <Instruction>Clique no botão abaixo para registro do ponto.</Instruction>
          <ButtonPoint style={{ backgroundColor: color }}>
            <ButtonsAreaIcon>
              <MaterialCommunityIcons name='clock-check-outline' color='#4db086' size={33}></MaterialCommunityIcons>
            </ButtonsAreaIcon>
            <Text style={{ fontFamily: 'montserrat-semibold', fontSize: 16, color: '#fff' }}>Registrar Entrada</Text>
          </ButtonPoint>      
        </ButtonsArea>
      </ScrollArea>
    </Container>
  )
}

export default Point;