import React, { useState, useEffect } from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
//Components
import Header from '../../components/Header';
import Fade from '../../components/Fade';
import InputForm from '../../components/InputForm';
import ButtonLg from '../../components/ButtonLg';
import Alert from '../../components/Alert';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { register, resetErrorStatus } from '../../slices/classSlice';
//Styles
import { StatusBar } from 'expo-status-bar';
import { 
  Container,
  Body,  
  TitleAreaPage,
  TitlePage,
  SearchContainer,
  Search,
  SearchIconArea,
  ToolsArea,
  ButtonAction,
  ButtonActionTitle,
  ModalView,
  ModalContent,
  ModalTitle,
  ModalResume
} from './styles'
import { EvilIcons, Ionicons } from '@expo/vector-icons';

const ElectronicCall = () => {

  const { userData } = useSelector((state) => state.me);
  const [ primaryColor, setPrimaryColor ] = useState('#fff');
  
  useEffect(()=>{
    if(userData){
      if(userData.companys_joined.length){
        setPrimaryColor(userData.companys_joined[0].primary_color);
      }

    }

  }, [userData]);  

  //Register class
  const { success, loading, error } = useSelector((state) => state.class);
  
  const dispatch = useDispatch();

  const [ showModal, setShowModal ] = useState(false);

  const [ name, setName ] = useState('');

  const [ disabledSubmit, setDisabledSubmit ] = useState(true);

  const handleSubmit = () => {
    const data = {
      company: userData.companys_joined[0].company_id_annotated,
      name
    };

    dispatch(register(data));
    
  };

  useEffect(()=>{
    if(!error){
      if(!loading){ //Fechar o modal quando finalizar o cadastro
        setShowModal(false);
      } else { //Desabilitar o botão quando estiver carregando.
        setDisabledSubmit(true);
      }

    } else {
      setDisabledSubmit(false);

    }

  }, [loading, error]);

  const closeModal = () => { //Fechar modal
    if(!loading){
      setShowModal(false);
    }
  };

  useEffect(()=>{ //Limpar o formulário caso ocorrer o cadastro com sucesso.
    if(success){
      setName('');
    }
  }, [success]);

  useEffect(()=>{ //Desabilitar o botão de submit quando o formulário estiver vazio.
    if(name !== ''){
      setDisabledSubmit(false);
    } else {
      setDisabledSubmit(true);
    }

  }, [name]);

  //Alerta de erros
  const [showAlertError, setShowAlertError] = useState(false);

  //Apresentar o alert caso tiver mensagem de erro.
  useEffect(()=>{
    if(error){
      setShowAlertError(true);
    } else {
      setShowAlertError(false);
    }

  }, [error]);

  //Fechar a mensagem de erro automaticamente.
  useEffect(()=>{
    if(!showAlertError){ //Resetar o estado de errorMessage caso não tiver mais visível o alerta.
      setShowAlertError(false);
    } else { //Caso estiver aberto a mensagem de erro, 1 segundo depois será fechada sozinha.
      const timeoutClearMessage = setTimeout(()=>{
        setShowAlertError(false);
      }, 6000);

      return () => {
        clearTimeout(timeoutClearMessage);
      }

    }

  }, [showAlertError]);

  return (
    <Container>
      {showAlertError && <Alert message='Falha ao cadastrar turma' setShow={setShowAlertError}/>}
      {showModal && <Fade/>}
      <Modal
        transparent={true}
        animationType='slide'
        visible={showModal}
        onRequestClose={() => closeModal()} //Permite fechar o modal quando clicado em uma área fora      
      >
        <TouchableWithoutFeedback onPress={() => closeModal()}>
          <ModalView>
            <ModalContent>
              <ModalTitle style={{color: primaryColor}}>Adicionar turma</ModalTitle>
              <ModalResume>No campo abaixo, adicione o nome da turma que deseja cadastrar e clique em adicionar. Cada empresa, pode ter várias turmas, e para cada turma podem ser cadastrados diversos alunos.</ModalResume>
              <InputForm label='Nome da turma' value={name} setValue={setName} color={primaryColor}/>
              <View style={{marginTop: 20}}>
                <ButtonLg disabled={disabledSubmit} title='Adicionar' loading={loading} color={primaryColor} fontColor={'#fff'} largeWidth='300px' action={handleSubmit}/>
              </View>
            </ModalContent>
          </ModalView>
        </TouchableWithoutFeedback>
      </Modal>
      <StatusBar 
        translucent
        backgroundColor="transparent"
      />       
      <Header themeColor={primaryColor}/>
      <Body>
        <TitleAreaPage>
          <TitlePage>Turmas</TitlePage>
        </TitleAreaPage>
        <SearchContainer style={{borderColor: primaryColor}}>
          <Search style={{borderColor: primaryColor}}/>
          <SearchIconArea>
            <EvilIcons name="search" size={42} color={primaryColor} />
          </SearchIconArea>
        </SearchContainer>
        <ToolsArea>
          <ButtonAction onPress={() => setShowModal(true)}>
            <Ionicons name="add-circle-outline" size={28} color={primaryColor}/>
            <ButtonActionTitle style={{color: primaryColor}}>Adicionar{"\n"}Turma</ButtonActionTitle>
          </ButtonAction>         
        </ToolsArea>
      </Body>
    </Container>
  )
};

export default ElectronicCall;