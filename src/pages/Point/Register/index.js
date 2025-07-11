import { Text, View, FlatList, TouchableWithoutFeedback } from 'react-native';
//Redux
import { startLoading, register, removePointToday } from '../../../slices/registerPointSlice';
//Hooks
import { useState, useEffect, useCallback } from 'react';
import useUtil from '../../../hooks/useUtil';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
//Components
import Header from '../../../components/Header';
import Fade from '../../../components/Fade';
import { Modal } from 'react-native';
import ButtonLg from '../../../components/ButtonLg';
//styles
import { StatusBar } from 'react-native';
import { 
  Container,
  ModalView,
  ModalContent,
  ModalTitle,
  ModalResume  
} from '../../ElectronicCall/styles';
import { 
  PageArea,
  TitleArea,
  ButtonsArea,
  ButtonPoint,
  ButtonsAreaIconJustify,
  ButtonJustify,
  ButtonsAreaIcon,
  Table,
  HeaderTable,
  Cell,
  Row,
  DeleteButton
} from '../styles';
import { Instruction } from '../../ElectronicCall/ListClass/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Register = ({ route }) => {

  //Route
  const { local, color } = route.params;  
  const navigation = useNavigation();

  //Redux
  const dispatch = useDispatch();
  const { open_point, all_points_today, loadingRemove, successRemove } = useSelector(state => state.registerPoint);
  
  //Obter a data e hora atual
  const { formatDate, formatTime, formatHour } = useUtil();

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);  
  
  //Registrar ponto
  const handleRegisterPoint = async () => {
    dispatch(startLoading());

    const data = {
      local_id: local ? local.id: 0,
    };

    await dispatch(register(data));

  };
  
  //Remover ponto registrado.
  const [ showModalRemove, setShowModalRemove ] = useState(false);
  const [ pointIdSelected, setPointIdSelected ] = useState(null);

  const handleRemovePoint = (item) => {
    setShowModalRemove(true);
    setPointIdSelected(item.id);
  };

  const removePoint = () => {
    if(pointIdSelected) dispatch(removePointToday(pointIdSelected));
  };

  useEffect(() => {
    if(successRemove) setShowModalRemove(false);
  }, [successRemove]);
  
  //Apresentar justificativa
  const [ showJustify, setShowJustify ] = useState(false);
  const [ justifyDescription, setJustifyDescription ] = useState('');

  const handleShowJustify = (description) => {
    setShowJustify(true);
    setJustifyDescription(description);

  };

  //Gerar linhas dabela
  const renderItem = useCallback(({ item }) => {
    if (item) {
      const entry = new Date(item.entry_datetime);
      const exit = item.exit_datetime ? new Date(item.exit_datetime) : null;

      const getDiffInHours = (start, end) => {
        const diffMs = end.getTime() - start.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        return diffHours.toFixed(2);
      };

      return (
        <Row>
          <Cell>{formatHour(entry)}</Cell>
          <Cell style={{ color: '#f66' }}>{exit ? formatHour(exit) : '?'}</Cell>
          <Cell>{exit ? getDiffInHours(entry, exit) : '-'}</Cell>
          <Cell>
            <DeleteButton onPress={() => handleRemovePoint(item)}>
              <MaterialCommunityIcons name='delete-circle' size={30} color={color} />
            </DeleteButton>
          </Cell>
          <Cell>
            <DeleteButton disabled={!item.is_justify} onPress={() => handleShowJustify(item.justify_description)}>
              <MaterialCommunityIcons name='file-eye' size={28} color={item.is_justify ? color : '#ddd'} />
            </DeleteButton>
          </Cell>
        </Row>
      );
    }
    return null;
  }, [color, formatHour, handleRemovePoint]);

  return (
    <Container>
      {(showModalRemove || showJustify) && <Fade/>}   
      <Modal
        transparent={true}
        animationType='slide'
        visible={showJustify}
        onRequestClose={() => setShowJustify(false)} //Permite fechar o modal quando clicado em uma área fora      
      >
        <TouchableWithoutFeedback onPress={() => setShowJustify(false)}>
          <ModalView>
            <ModalContent style={{ paddingBottom: 40 }}>
              <ModalTitle style={{color}}>Justificativa</ModalTitle>
              <ModalResume>{ justifyDescription }</ModalResume>
            </ModalContent>
          </ModalView>
        </TouchableWithoutFeedback>
      </Modal>              
      <Modal
        transparent={true}
        animationType='slide'
        visible={showModalRemove}
        onRequestClose={() => setShowModalRemove(false)} //Permite fechar o modal quando clicado em uma área fora      
      >
        <TouchableWithoutFeedback onPress={() => setShowModalRemove(false)}>
          <ModalView>
            <ModalContent>
              <ModalTitle style={{color}}>Deseja remover esse registro de ponto ?</ModalTitle>
              <ModalResume>Ao clicar no botão abaixo, você irá excluir esse registro permanentemente.</ModalResume>
              <View style={{marginTop: 20}}>
                <ButtonLg loading={loadingRemove} disabled={loadingRemove} title='Remover' color={'#e3222c'} fontColor={'#fff'} largeWidth='300px' action={() => removePoint()}/>
              </View>
            </ModalContent>
          </ModalView>
        </TouchableWithoutFeedback>
      </Modal>          
      <StatusBar 
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Header themeColor={color}/>      
      <PageArea>
        <TitleArea style={{height: 100}}>
          <Instruction>Registrar ponto no local:</Instruction>
          <Text style={{fontFamily: 'montserrat-semibold', color: '#64748b'}}>{local ? local.name : '-'}</Text>
        </TitleArea>  
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontFamily: 'montserrat-medium', fontSize: 14, color: '#64748b' }}>
            {formatDate(now)}
          </Text>
          <Text style={{ fontFamily: 'montserrat-bold', fontSize: 44, color }}>
            {formatTime(now)}
          </Text>
        </View>
        <ButtonsArea>
          <ButtonPoint style={{ backgroundColor: color }} onPress={() => handleRegisterPoint()}>
            <ButtonsAreaIcon>
              <MaterialCommunityIcons name={ 'exit_datetime' in open_point && !open_point.exit_datetime ? 'clock-alert-outline': 'clock-check-outline' } color={ 'exit_datetime' in open_point && !open_point.exit_datetime ? '#f66': '#4db086' } size={33}></MaterialCommunityIcons>
            </ButtonsAreaIcon>
            <Text style={{ fontFamily: 'montserrat-semibold', fontSize: 16, color: '#fff', wordBreak: 'break-word' }}>{  'exit_datetime' in open_point && !open_point.exit_datetime ? 'Registrar\nSaída': 'Registrar\nEntrada'}</Text>
          </ButtonPoint>      
          <ButtonJustify onPress={() => navigation.navigate('Justify')}> 
            <Text style={{ fontFamily: 'montserrat-semibold', fontSize: 16, color: '#fff', wordBreak: 'break-word', textAlign: 'right' }}>Justificar{"\n"}Ponto</Text>
            <ButtonsAreaIconJustify>
              <MaterialCommunityIcons name='alert' color={'rgb(191, 159, 18)'} size={33}></MaterialCommunityIcons>
            </ButtonsAreaIconJustify>                   
          </ButtonJustify>
        </ButtonsArea>   
        <Table>
          <View style={{ alignItems: 'center' }}>
            <Instruction>Registros diários</Instruction> 
          </View> 
          <HeaderTable>
            <Cell>Entrada</Cell>
            <Cell>Saída</Cell>
            <Cell>Tempo</Cell>
            <Cell>Remover</Cell>
            <Cell>Justificativa</Cell>
          </HeaderTable>
          {
            all_points_today && all_points_today.length > 0 && (
              <FlatList
                data={all_points_today}
                renderItem={renderItem}
                keyExtractor={(item) => item ? item.id.toString(): '-'}                  
              />
            )
          }
        </Table>                        
      </PageArea>              
    </Container>
  )
}

export default Register;