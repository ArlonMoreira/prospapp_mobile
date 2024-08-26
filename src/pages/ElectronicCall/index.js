import React, { useState, useEffect } from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
//Components
import Header from '../../components/Header';
import Fade from '../../components/Fade';
import InputForm from '../../components/InputForm';
import ButtonLg from '../../components/ButtonLg';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../slices/classSlice';
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
  const { loading } = useSelector((state) => state.class);
  
  const dispath = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState('');

  const handleRegister = () => {
    const data = {
      company: userData.companys_joined[0].company_id_annotated,
      name
    };

    dispath(register(data));
    
  };

  useEffect(()=>{ //Fechar o modal quando finalizar o cadastro
    if(!loading){
      setShowModal(false);
    }

  }, [loading]);

  return (
    <Container>
      {showModal && <Fade/>}
      <Modal
        transparent={true}
        animationType='slide'
        visible={showModal}
        onRequestClose={() => setShowModal(false)} //Permite fechar o modal quando clicado em uma área fora      
      >
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <ModalView>
            <ModalContent>
              <ModalTitle style={{color: primaryColor}}>Adicionar turma</ModalTitle>
              <ModalResume>No campo abaixo, adicione o nome da turma que deseja cadastrar e clique em adicionar. Cada empresa, pode ter várias turmas, e para cada turma podem ser cadastrados diversos alunos.</ModalResume>
              <InputForm label='Nome da turma' value={name} setValue={setName} color={primaryColor}/>
              <View style={{marginTop: 20}}>
                <ButtonLg title='Adicionar' loading={loading} color={primaryColor} fontColor={'#fff'} largeWidth='300px' action={handleRegister}/>
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
          <ButtonAction>
            <Ionicons name="push-outline" size={28} color={primaryColor}/>
            <ButtonActionTitle style={{color: primaryColor}}>Gerar{"\n"}Relatório</ButtonActionTitle>
          </ButtonAction>          
        </ToolsArea>
      </Body>
    </Container>
  )
};

export default ElectronicCall;