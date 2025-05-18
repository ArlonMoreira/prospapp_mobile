import React, { useEffect, useState } from 'react'
import { Text, FlatList, View, Modal, TouchableWithoutFeedback } from 'react-native';
//Redux
import { list, removePointToday, register, resetErrorMessage } from '../../slices/registerPointSlice';
import { startLoading } from '../../slices/registerPointSlice';
//Hooks
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
//Components
import Header from '../../components/Header';
import LoadingPage from '../../components/LoadingPage';
import ButtonLg from '../../components/ButtonLg';
import Fade from '../../components/Fade';
import Alert from '../../components/Alert';
//Styles
import { StatusBar } from 'expo-status-bar';
import { 
  Container,
  ModalView,
  ModalContent,
  ModalTitle,
  ModalResume  
} from '../ElectronicCall/styles';
import { 
  PageArea,
  TitleArea,
  ButtonsArea,
  ButtonPoint,
  ButtonsAreaIcon,
  Table,
  HeaderTable,
  Cell,
  Row,
  DeleteButton
} from './styles';
import { Instruction } from '../ElectronicCall/ListClass/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Point = ({ route }) => {

  const dispatch = useDispatch();
  const { loading, open_point, all_points_today, loadingRemove, successRemove, errorMessage } = useSelector(state => state.registerPoint);

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

  const handleRegisterPoint = async () => {
    dispatch(startLoading());

    const data = {
      local_id: local ? local.id: 0,
    };

    await dispatch(register(data));

  };

  const formatHour = (datetime) => {
    return new Date(datetime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  //Alert mensagem
  const [showAlertError, setShowAlertError] = useState(false);

  //Apresentar o alert caso tiver mensagem de erro.
  useEffect(()=>{
    if(errorMessage){
      setShowAlertError(true);
    } else {
      setShowAlertError(false);
    }

  }, [errorMessage, setShowAlertError]);

  //Fechar a mensagem de erro automaticamente.
  useEffect(()=>{
    if(!showAlertError){ //Resetar o estado de errorMessage caso não tiver mais visível o alerta.
      dispatch(resetErrorMessage());
    } else { //Caso estiver aberto a mensagem de erro, 1 segundo depois será fechada sozinha.
      const timeoutClearMessage = setTimeout(()=>{
        dispatch(resetErrorMessage());
      }, 6000);

      return () => {
        clearTimeout(timeoutClearMessage);
      }

    }

  }, [showAlertError]);  
  
  // Gerar linhas dabela
  const renderItem = ({ item }) => {
    if (item) {
      const entry = new Date(item.entry_datetime);
      const exit = item.exit_datetime ? new Date(item.exit_datetime) : null;
    
      const getDiffInHours = (start, end) => {
        const diffMs = end.getTime() - start.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        return diffHours.toFixed(2); // ex: "1.75"
      };
    
      return (
        <Row>
          <Cell>{formatHour(entry)}</Cell>
          <Cell style={{color: '#f66'}}>{exit ? formatHour(exit) : '?'}</Cell>
          <Cell>
            {exit ? getDiffInHours(entry, exit) : '-'}
          </Cell>
          <Cell>
            <DeleteButton onPress={() => handleRemovePoint(item)}>
              <MaterialCommunityIcons name='delete-circle' size={30} color={color} />
            </DeleteButton>
          </Cell>
        </Row>
      );

    }

  }; 

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);  

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR'); // Ex: 07/05/2025
  };  

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
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

  return (
    <>
      {
        loading ? <LoadingPage backgroundColor={color} logo={logo}/> : (
          <Container>
            {showModalRemove && <Fade/>}
            {
              showAlertError && <Alert message={errorMessage} setShow={setShowAlertError}/>
            }            
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
            />      
            <Header themeColor={color}/>
            <PageArea>
              <TitleArea>
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
                  <Text style={{ fontFamily: 'montserrat-semibold', fontSize: 16, color: '#fff' }}>{  'exit_datetime' in open_point && !open_point.exit_datetime ? 'Registrar Saída': 'Registrar Entrada'}</Text>
                </ButtonPoint>      
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
    </>   
  )
}

export default Point;