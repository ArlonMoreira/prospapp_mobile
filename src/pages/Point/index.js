import React, { useEffect, useState } from 'react'
import { Text } from 'react-native';
//Redux
import { register } from '../../slices/registerPointSlice';
//Hooks
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
//Components
import Header from '../../components/Header';
import LoadingPage from '../../components/LoadingPage';
//Styles
import { StatusBar } from 'expo-status-bar';
import { Container } from '../ElectronicCall/styles';
import { ScrollArea, TitleArea, ButtonsArea, ButtonPoint, ButtonsAreaIcon } from './styles';
import { Instruction } from '../ElectronicCall/ListClass/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Point = ({ route }) => {

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.registerPoint);

  const [ color, setColor ] = useState(null);
  const [ local, setLocal ] = useState(null);
  const [ logo, setLogo ] = useState(null);

  useEffect(() => {
    setColor(route.params.color);
    setLocal(route.params.data);
    setLogo(route.params.logo);

  }, []);

  const handleRegisterPoint = () => {
    const data = {
      local_id: local ? local.id: 0
    };

    dispatch(register(data));

  };

  return (
    <>
      {
        loading ? <LoadingPage backgroundColor={color} logo={logo}/> : (
          <Container>
            <StatusBar 
              translucent
              backgroundColor="transparent"
            />      
            <Header themeColor={color}/>
            <ScrollArea>
              <TitleArea>
                <Instruction>Registrar ponto no local:</Instruction>
                <Text style={{fontFamily: 'montserrat-bold', fontSize: 22, color: color}}>{local ? local.name : '-'}</Text>
              </TitleArea>
              <ButtonsArea>
                <Instruction>Clique no botão abaixo para registro do ponto.</Instruction>
                <ButtonPoint style={{ backgroundColor: color }} onPress={() => handleRegisterPoint()}>
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
    </>   
  )
}

export default Point;