import React, { useEffect, useState } from 'react'
import { Text } from 'react-native';
//Redux
import { register } from '../../slices/registerPointSlice';
import { list } from '../../slices/registerPointSlice';
//Hooks
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
//Components
import Header from '../../components/Header';
import LoadingPage from '../../components/LoadingPage';
//Styles
import { StatusBar } from 'expo-status-bar';
import { Container } from '../ElectronicCall/styles';
import { 
  ScrollArea,
  TitleArea,
  ButtonsArea,
  ButtonPoint,
  ButtonsAreaIcon,
  Table,
  HeaderTable,
  Cell
} from './styles';
import { Instruction } from '../ElectronicCall/ListClass/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Point = ({ route }) => {

  const dispatch = useDispatch();
  const { loading, open_point, all_points_today } = useSelector(state => state.registerPoint);

  const [ color, setColor ] = useState(null);
  const [ local, setLocal ] = useState(null);
  const [ logo, setLogo ] = useState(null);

  useEffect(() => {
    setColor(route.params.color);
    setLocal(route.params.data);
    setLogo(route.params.logo);

  }, []);

  useEffect(() => {
    if(local) dispatch(list(local.id));
  }, [local]);

  const handleRegisterPoint = () => {
    const data = {
      local_id: local ? local.id: 0
    };

    dispatch(register(data));

  };

  useEffect(() => {
    console.log(all_points_today)
  }, [all_points_today])

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
                    <MaterialCommunityIcons name={ 'exit_datetime' in open_point && !open_point.exit_datetime ? 'clock-alert-outline': 'clock-check-outline' } color={ 'exit_datetime' in open_point && !open_point.exit_datetime ? '#f66': '#4db086' } size={33}></MaterialCommunityIcons>
                  </ButtonsAreaIcon>
                  <Text style={{ fontFamily: 'montserrat-semibold', fontSize: 16, color: '#fff' }}>{  'exit_datetime' in open_point && !open_point.exit_datetime ? 'Registrar Saída': 'Registrar Entrada'}</Text>
                </ButtonPoint>      
              </ButtonsArea>
              <Table>
                <HeaderTable>
                  <Cell>Entrada</Cell>
                  <Cell>Saída</Cell>
                  <Cell>Remover</Cell>
                </HeaderTable>
              </Table>
            </ScrollArea>
          </Container>          
        )
      }
    </>   
  )
}

export default Point;