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
import { Picker } from '@react-native-picker/picker';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { register, list, call } from '../../slices/studentSlice';
import { generated, resetReportState } from '../../slices/reportSlice';
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
  ExportTouch,
  Select
} from './styles'
import { SimpleLineIcons, Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
//PDF
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

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
  const [ studentSelected, setStudentSelected ] = useState(null);
  const [ students, setStudents ] = useState([]);
  const [ disabledSumitCall, setDisabledSubmitCall ] = useState(true);

  //Selecionar o objeto de estudantes
  useEffect(()=>{
    setStudents(data);

  }, [data]);

  //Quando cadastrar um usuário novo deve incluir esse novo usuário na lisa de estudante
  useEffect(()=>{
    const updateStudents = [...students];
    
    data.forEach(item => {
      const exists = students.some(student => student.id === item.id);
      if(!exists){
        updateStudents.push(item);
      }
    });
    
    setStudents(updateStudents);

  }, [success]);

  //Bloquear botão de chamada caso todos os estudantes não tiverem marcado presença
  useEffect(()=>{
    const count = students.filter((student) => student.present == null).length;
    if(!count){
      setDisabledSubmitCall(false);
    } else {
      setDisabledSubmitCall(true);
    }

  }, [students]);  

  //Seleciona o estudante e abre o modal para selecionar a presença
  const handleCall = (student) => {
    setStudentSelected(student);    
    setShowModalCall(true);

  };

  //Seleciona a presenã do estudante selecionado
  const handleCallPresent = ({student, present}) => {
    setStudents(students => 
      students.map((item) => item.id === student.id ? {...item, present}: item)
    )
    closeModalCall();

  };

  //Registrar chamada
  const handleCallRegister = () => {
    const data = [
      ...students.map((student) => ({student: student.id, present: student.present}))
    ]
    
    dispatch(call(data));

  };

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

  const { data:dataReport, loading:loadingReport, success: successReport } = useSelector((state) => state.report);
  const [ showModalReport, setShowModalReport ] = useState(false);
  //Anos a serem filtrados
  const [ yearsOptions, setYearOptions ] = useState([]);
  const [ yearSelected, setYearSelected ] = useState(null);
  //Meses a serem filtrados
  const [ monthsOptiopns ] = useState(['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']);
  const [ monthSelected, setMonthSelected ] = useState(null);

  const closeModalReport = () => {
    if(!loadingReport){
      setShowModalReport(false);
    }
  };

  //Gerar gelatório
  const handleReportGenerated = () => {
    const data = {
      classId,
      year: yearSelected,
      month: monthSelected
    };

    dispatch(generated(data));

  };

  const printToFile = async (data) => {
    
    const breakObjectInParts = (obj, daysPerPart) => {
      const keys = Object.keys(obj);
      let result = [];
      for (let i = 0; i < keys.length; i += daysPerPart) {
        const part = keys.slice(i, i + daysPerPart).reduce((acc, key) => {
          acc[key] = obj[key];
          return acc;
        }, {});
        result.push(part);
      }
      return result;
    };
    
    const obj = {};
    
    Object.keys(data).forEach((al) => {
      obj[al] = breakObjectInParts(data[al], 6);
    }); 

    const tables = []

    Object.keys(obj).forEach((key) => {
      obj[key].forEach((x, i) => {
        if (!tables[i]) {
          tables[i] = {};  // Cria o objeto vazio para a posição i
        }
        tables[i][key] = x;  // Atribui o valor para a posição i e chave correspondente
      });
    });    

    const html = `
    <html lang="en">

      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Tabela PDF</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 10px;
              margin: 20px;
            }

            h1 {
                text-align: center;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                table-layout: fixed;
            }

            th:first-child,
            td:first-child {
                width: 200px;
            }        

            th,
            td {
                border: 1px solid #000;
                padding: 4px;
                text-align: center;
                font-size: 14px;
                word-wrap: break-word;
                width: 75;
            }

            th {
                background-color: #f4f4f4;
            }
          </style>
      </head>
      
      <body>

          ${
            tables.map((table) => {

              const rows = Object.keys(table);
              const columns = Object.keys(table[rows[0]]);

              return `
                <table>
                  <thead>
                      <tr>
                        <th>Aluno</th>
                        ${
                          
                          columns.map((col) => {
                            const date = new Date(col);
                            return `<th>${date.toLocaleDateString('pt-BR')}</th>`
                          }).join('')
                        }
                      </tr>
                  </thead>
                  <tbody>
                      ${
                        rows.map((row) => `
                          <tr>
                            <td>${row}</td>
                            ${
                              columns.map((col) => {
                                if(data[row][col] == null){
                                  return `<td>-</td>`
                                }

                                return `<td>${data[row][col] ? 'Presente': 'Falta'}</td>`

                              }).join('')
                            }
                          </tr>                    
                        `).join('')
                      }      
                  </tbody>
              </table>`              
            })
          }

      </body>
    
    </html>
    `;    
    
    try {

      const { uri } = await Print.printToFileAsync({ html });

      await shareAsync(uri, { 
        UTI: '.pdf',
        mimeType: 'application/pdf'
      });      

    } catch (error) {
      console.error("Erro ao compartilhar:", error);

    }

  }; 

  //Caso for gerado com sucesso, irá fechar o modal e reiniciar os estados;
  useEffect(()=>{
    if(successReport){
      printToFile(dataReport);
      dispatch(resetReportState()); //Reiniciar o estado do relatório quando o mesmo for gerado com sucesso
      closeModalReport();

    }

  }, [dataReport]);

  useEffect(()=>{
    //Obter data atual
    const currentTime = new Date();

    //Criar uma lista com todos os anos incluindo o ano atual
    const year = currentTime.getFullYear();
    setYearOptions(Array.from({ length: 3 }, (_, i) => year - i));
    setYearSelected(year);

    //Selecionar o mês atual
    const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
    setMonthSelected(month);
    
  }, [dispatch]);  

  return (
    <>
      {
        loading ? <LoadingPage/> : (
          <Container>
            {(showModal || showModalCall || showModalReport) && <Fade/>}
            <Modal
              transparent={true}
              animationType='slide'
              visible={showModalReport}
              onRequestClose={() => closeModalReport()} //Permite fechar o modal quando clicado em uma área fora      
            >
              <TouchableWithoutFeedback onPress={() => closeModalReport()}>
                <ModalView>
                  <ModalContent>
                    <ModalTitle style={{color: primaryColor}}>Gerar relatório</ModalTitle>
                    <ModalResume>Selecione o período que desejar para gerar o relatório de presença.</ModalResume>
                    <Select>
                      <Picker
                        selectedValue={yearSelected}
                        style={{
                          backgroundColor: 'transparent', // deixa o Picker sem cor
                          width: '100%',
                          height: '100%'
                        }}
                        onValueChange={(itemValue) => setYearSelected(itemValue)}
                      >
                        {
                          yearsOptions.map((option) => <Picker.Item key={option} value={option} label={option}/>)
                        }
                      </Picker>                      
                    </Select>
                    <Select>
                      <Picker
                        selectedValue={monthSelected}
                        style={{
                          backgroundColor: 'transparent', // deixa o Picker sem cor
                          width: '100%',
                          height: '100%'
                        }}
                        onValueChange={(itemValue) => setMonthSelected(itemValue)}
                      >
                        {
                          monthsOptiopns.map((option) => <Picker.Item key={option} value={option} label={option}/>)
                        }
                      </Picker>                      
                    </Select>
                    <View style={{marginTop: 20}}>
                      <ButtonLg title='Salvar e compartilhar' loading={loadingReport} color={primaryColor} fontColor={'#fff'} largeWidth='300px' action={handleReportGenerated}/>
                    </View>                                                           
                  </ModalContent>
                </ModalView>
              </TouchableWithoutFeedback>
            </Modal>
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
                  {
                    studentSelected && (
                      <ModalContent>
                        <ModalTitle style={{color: primaryColor}}>{studentSelected.name}</ModalTitle>
                        <ModalResume>Defina a presença do aluno em {currentDate}.</ModalResume>
                        <CallOptions>
                          <Radio onPress={() => handleCallPresent({student: studentSelected, present: true})}>
                            <RadioIcon style={{borderColor: studentSelected.present == true ? '#59DE7E': '#CCC'}}>
                              <FontAwesome name='check' size={22} color={studentSelected.present == true ? '#59DE7E': '#CCC'}></FontAwesome>
                            </RadioIcon>
                            <RadioLabel>
                              <RadioText style={{color: studentSelected.present == true ? '#59DE7E': '#CCC'}}>Presente</RadioText>
                            </RadioLabel>
                          </Radio>
                          <Radio onPress={() => handleCallPresent({student: studentSelected, present: false})}>
                            <RadioIcon style={{borderColor: studentSelected.present == false ? '#FF6666': '#CCC'}}>
                              <FontAwesome name='remove' size={22} color={studentSelected.present == false ? '#FF6666': '#CCC'}></FontAwesome>
                            </RadioIcon>
                            <RadioLabel>
                              <RadioText style={{color: studentSelected.present == false ? '#FF6666': '#CCC'}}>Falta</RadioText>
                            </RadioLabel>
                          </Radio>                
                        </CallOptions>                        
                      </ModalContent>
                    )
                  }
                </ModalView>
              </TouchableWithoutFeedback>
            </Modal>          
            <StatusBar 
              translucent
              backgroundColor="transparent"
            />      
            <Header themeColor={primaryColor}></Header>
            <Body>
              <TitleAreaPage>
                <TitlePage style={{color: primaryColor}}>Chamada</TitlePage>
              </TitleAreaPage>   
              <InfoArea>
                <InfoText>
                  <SimpleLineIcons name='graduation' size={22} color={'#606060'}/>
                  <InfoName>{className}</InfoName>
                </InfoText>
                <InfoText>
                  <SimpleLineIcons name='calendar' size={18} color={'#606060'}/>
                  <InfoName>{currentDate}</InfoName>
                </InfoText>          
              </InfoArea>
              <ToolsArea>
                <ButtonAction borderColor={primaryColor} onPress={() => setShowModal(true)}>
                  <Ionicons name="person-add" size={24} color={primaryColor}/>
                  <ButtonActionTitle style={{color: primaryColor}}>Adicionar aluno</ButtonActionTitle>
                </ButtonAction>
                <ButtonAction borderColor={primaryColor} onPress={() => setShowModalReport(true)}>
                  <Ionicons name="download" size={24} color={primaryColor}/>
                  <ButtonActionTitle style={{color: primaryColor}}>Baixa relatório</ButtonActionTitle>
                </ButtonAction>
                <ButtonAction borderColor={primaryColor}>
                  <Ionicons name="pencil-sharp" size={24} color={primaryColor}/>
                  <ButtonActionTitle style={{color: primaryColor}}>Editar aluno</ButtonActionTitle>
                </ButtonAction>
                <ButtonAction borderColor={primaryColor}>
                  <Ionicons name="person-remove" size={24} color={primaryColor}/>
                  <ButtonActionTitle style={{color: primaryColor}}>Remover aluno</ButtonActionTitle>
                </ButtonAction>                                             
              </ToolsArea>
              <InstructionArea>
                <Instruction>Clique para marca a presença/ausência do aluno:</Instruction>
              </InstructionArea>
              <ContainerStudent>
                {
                  (students && students.length > 0) && students.map((student)=>(
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
                <View style={{marginTop: 20}}>
                  <ButtonLg disabled={disabledSumitCall} title='Registrar' color={primaryColor} fontColor={'#fff'} largeWidth='300px' action={handleCallRegister} />
                </View>                
              </ContainerStudent>
            </Body>
          </Container>
        )
      }
    </>
  )
};

export default Call;