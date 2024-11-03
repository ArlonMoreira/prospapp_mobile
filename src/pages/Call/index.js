import React, { useState, useEffect, useContext } from 'react';
import { Modal, TouchableWithoutFeedback, View, Platform } from 'react-native';
//Hooks
import useCurrentDate from '../../hooks/useCurrentDate';
//Components
import Header from '../../components/Header';
import SearchArea from '../../components/SearchArea';
import Fade from '../../components/Fade';
import InputForm from '../../components/InputForm';
import ButtonLg from '../../components/ButtonLg';
import LoadingPage from '../../components/LoadingPage';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { register, list, call } from '../../slices/studentSlice';
// Context
import { LoadingContext } from '../../contexts/LoadingContext';
//Styles
import { StatusBar } from 'expo-status-bar';
import {
  Container,
  Body,
  TitleAreaPage,
  TitlePage,
  InfoArea,
  InfoText,
  InfoName,
  Edit,
  ToolsArea,
  ButtonAction,
  ButtonActionTitle,
  ModalView,
  ModalContent,
  ModalTitle,
  ModalResume,
  InstructionArea,
  Instruction,
  ContainerStudent,
  StudentCard,
  StudentName,
  StudentNameArea,
  StudentToolsArea,
  CallOptions,
  Radio,
  RadioIcon,
  RadioLabel,
  RadioText,
  ExportTouch
} from './styles'
import { SimpleLineIcons, Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
//PDF
import * as Print from 'expo-print';

const Call = ({ route }) => {

  const { loading, setLoading } = useContext(LoadingContext);  

  const currentDate = useCurrentDate();

  const { classId, className } = route.params;

  const { userData } = useSelector((state) => state.me);
  const [ primaryColor, setPrimaryColor ] = useState('#fff');
  
  useEffect(()=>{
    if(userData){
      if(userData.companys_joined.length){
        setPrimaryColor(userData.companys_joined[0].primary_color);
      }

    }

  }, [userData]);

  //Register student  
  const { success, loadingList, loadingRegister, error, data, loadingCall, successCall } = useSelector((state) => state.student);
  
  const dispatch = useDispatch();

  const [ showModal, setShowModal ] = useState(false);

  const [ name, setName ] = useState('');
  const [ identification_number, setIdentification_number ] = useState(0);

  const [ disabledSubmit, setDisabledSubmit ] = useState(true);

  const handleSubmit = () => {
    const data = {
      name,
      identification_number,
      classId
    };

    dispatch(register(data));
    
  };
  
  useEffect(()=>{        
    if(!error){
      if(!loadingRegister){ //Fechar o modal quando finalizar o cadastro
        setShowModal(false);
      } else { //Desabilitar o botão quando estiver carregando.
        setDisabledSubmit(true);
      }

    } else {
      setDisabledSubmit(false);

    }

  }, [loadingRegister, error]);  
  
  const closeModal = () => { //Fechar modal
    if(!loadingRegister){
      setShowModal(false);
    }
  };

  useEffect(()=>{ //Limpar o formulário caso ocorrer o cadastro com sucesso.
    if(success){
      setName('');
      setIdentification_number(0);
      closeModal();
    }
  }, [success]);

  useEffect(()=>{ //Desabilitar o botão de submit quando o formulário estiver vazio.
    if(name !== '' && identification_number !== ''){
      setDisabledSubmit(false);
    } else {
      setDisabledSubmit(true);
    }

  }, [name, identification_number]);

  //Lista studants
  useEffect(()=>{
    if(classId){
      dispatch(list(classId));
    }

  }, [dispatch, classId]);

  //Call students
  const [ showModalCall, setShowModalCall ] = useState(false);

  const [ studentId, setStudentId ] = useState(null);
  const [ studentName, setStudentName ] = useState('');
  const [ studentPresent, setStudentPresent ] = useState('#ccc');

  const handleCall = (student) => {
    setShowModalCall(true);
    setStudentId(student.id)
    setStudentName(student.name);
    setStudentPresent(student.present);
  };

  const handleCallPresent = (present) => {
    const data = {
      student: studentId,
      present
    };

    dispatch(call(data));

  };

  useEffect(()=>{
    const currentStudent = data.filter((student) => student.id === studentId)[0];
    if(currentStudent){
      setStudentPresent(currentStudent.present);
    }

  }, [data]);

  useEffect(()=>{
    if(successCall){
      closeModalCall();
    }
  }, [successCall]);

  const closeModalCall = () => { //Fechar modal
    if(!loadingCall){
      setShowModalCall(false);
    }
  };

  useEffect(()=>{ //Atualiza para o contexto que a página está sendo carregada.
    setLoading(loadingCall);
  }, [loadingCall]);

  useEffect(()=>{
    setLoading(loadingList);
  }, [loadingList]);

  const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body style="text-align: center;">
      <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
        Hello Expo!
      </h1>
      <img
        src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
        style="width: 90vw;" />
    </body>
  </html>
  `;  

  const [ selectedPrinter, setSelectedPrinter ] = useState();

  const print = async () => {
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url,
    })
  };

  return (
    <>
      {
        loading ? <LoadingPage/> : (
          <Container>
            {(showModal || showModalCall) && <Fade/>}
            <Modal
              transparent={true}
              animationType='slide'
              visible={showModal}
              onRequestClose={() => closeModal()} //Permite fechar o modal quando clicado em uma área fora      
            >
              <TouchableWithoutFeedback onPress={() => closeModal()}>
                <ModalView>
                  <ModalContent>
                    <ModalTitle style={{color: primaryColor}}>Adicionar aluno</ModalTitle>
                    <ModalResume>No campo abaixo, adicione os dados do aluno para que deseja cadastrado e clique em adicionar.</ModalResume>
                    <InputForm label='Nome do aluno' value={name} setValue={setName} color={primaryColor}/>
                    <InputForm label='CPF do aluno' value={identification_number} setValue={setIdentification_number} color={primaryColor}/>            
                    <View style={{marginTop: 20}}>
                      <ButtonLg disabled={disabledSubmit} title='Adicionar' loading={loadingRegister} color={primaryColor} fontColor={'#fff'} largeWidth='300px' action={handleSubmit}/>
                    </View>
                  </ModalContent>
                </ModalView>
              </TouchableWithoutFeedback>
            </Modal>
            <Modal
              transparent={true}
              animationType='slide'
              visible={showModalCall}
              onRequestClose={() => setShowModalCall(false)} //Permite fechar o modal quando clicado em uma área fora      
            >
              <TouchableWithoutFeedback onPress={() => setShowModalCall(false)}>
                <ModalView>
                  <ModalContent>
                    <ModalTitle style={{color: primaryColor}}>{studentName}</ModalTitle>
                    <ModalResume>Defina a presença do aluno em {currentDate}.</ModalResume>
                    <CallOptions>
                      <Radio onPress={() => handleCallPresent(true)}>
                        <RadioIcon style={{borderColor: studentPresent == true ? '#59DE7E': '#CCC'}}>
                          <FontAwesome name='check' size={22} color={studentPresent == true ? '#59DE7E': '#CCC'}></FontAwesome>
                        </RadioIcon>
                        <RadioLabel>
                          <RadioText style={{color: studentPresent == true ? '#59DE7E': '#CCC'}}>Presente</RadioText>
                        </RadioLabel>
                      </Radio>
                      <Radio onPress={() => handleCallPresent(false)}>
                        <RadioIcon style={{borderColor: studentPresent == false ? '#FF6666': '#CCC'}}>
                          <FontAwesome name='remove' size={22} color={studentPresent == false ? '#FF6666': '#CCC'}></FontAwesome>
                        </RadioIcon>
                        <RadioLabel>
                          <RadioText style={{color: studentPresent == false ? '#FF6666': '#CCC'}}>Falta</RadioText>
                        </RadioLabel>
                      </Radio>                
                    </CallOptions>
                  </ModalContent>
                </ModalView>
              </TouchableWithoutFeedback>
            </Modal>          
            <StatusBar 
              translucent
              backgroundColor="transparent"
            />      
            <Header themeColor={primaryColor} exportAction={print}></Header>
            <Body>
              <TitleAreaPage>
                <TitlePage style={{color: primaryColor}}>Chamada</TitlePage>
              </TitleAreaPage>   
              <InfoArea>
                <InfoText>
                  <SimpleLineIcons name='graduation' size={22} color={'#606060'}/>
                  <InfoName>{className}</InfoName>
                  {/* <Edit>
                    <MaterialIcons name='edit' size={24} color={primaryColor}/>
                  </Edit> */}
                </InfoText>
                <InfoText>
                  <SimpleLineIcons name='calendar' size={18} color={'#606060'}/>
                  <InfoName>{currentDate}</InfoName>
                </InfoText>          
              </InfoArea>
              <SearchArea color={'#939393'}/>
              <ToolsArea>
                <ButtonAction onPress={() => setShowModal(true)}>
                  <Ionicons name="add-circle-outline" size={28} color={primaryColor}/>
                  <ButtonActionTitle style={{color: primaryColor}}>Adicionar aluno</ButtonActionTitle>
                </ButtonAction>         
              </ToolsArea>
              <InstructionArea>
                <Instruction>Clique para marca a presença/ausência do aluno:</Instruction>
              </InstructionArea>
              <ContainerStudent>
                {
                  (data && data.length > 0) && data.map((student)=>(
                    <StudentCard key={student.id}>
                      <StudentNameArea>
                        <StudentName style={{color: primaryColor}}>{student.name}</StudentName>
                      </StudentNameArea>
                      <StudentToolsArea onPress={() => handleCall(student)} style={{borderColor:student.present == true ? '#59DE7E': student.present == false ? '#FF6666': '#ccc'}}>
                        {
                          student.present == true && <FontAwesome name='check' size={22} color={'#59DE7E'}></FontAwesome>
                        }
                        {
                          student.present == false && <FontAwesome name='remove' size={22} color={'#FF6666'}></FontAwesome>
                        }
                        {
                          student.present == null && <FontAwesome5 name='question' size={22} color={'#CCC'}></FontAwesome5>
                        }                                        
                      </StudentToolsArea>
                    </StudentCard>
                  ))
                }
              </ContainerStudent>
            </Body>
          </Container>
        )
      }
    </>
  )
};

export default Call;