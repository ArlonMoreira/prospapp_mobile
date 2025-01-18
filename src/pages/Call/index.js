import React, { useState, useEffect, useContext } from 'react';
import { Modal, TouchableWithoutFeedback, View, Text } from 'react-native';
//Hooks
import useCurrentDate from '../../hooks/useCurrentDate';
import { useNavigation, useNavigationState } from '@react-navigation/native';
//Components
import Header from '../../components/Header';
import Fade from '../../components/Fade';
import InputForm from '../../components/InputForm';
import ButtonLg from '../../components/ButtonLg';
import LoadingPage from '../../components/LoadingPage';
import { Picker } from '@react-native-picker/picker';
import BoxAction from '../../components/BoxAction';
import CallRegister from './CallRegister';
import EditStudent from './EditStudent';
import RemoveStudent from './RemoveStudent';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { register, list, call, change, remove } from '../../slices/studentSlice';
import { generated, resetReportState } from '../../slices/reportSlice';
//Context
import { LoadingContext } from '../../contexts/LoadingContext';
//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
  ToolsArea,
  ModalView,
  ModalContent,
  ModalTitle,
  ModalResume,
  CallOptions,
  Radio,
  RadioIcon,
  RadioLabel,
  RadioText,
  Select
} from './styles'
import { SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
//PDF
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const Stack = createNativeStackNavigator();

const URL = process.env.EXPO_PUBLIC_API_URL;

const Call = ({ route }) => {

  const navigation = useNavigation();  

  const { loading, setLoading } = useContext(LoadingContext);  

  const { currentDate, currentHour } = useCurrentDate();

  const { classId, className } = route.params;

  const { userData } = useSelector((state) => state.me);
  const [ primaryColor, setPrimaryColor ] = useState('#fff');
  const [ secundaryColor, setSecundaryColor ] = useState('#fff');
  const [ nameUser, setNameUser ] = useState('');
  const [ logo, setLogo ] = useState(null);
  
  useEffect(()=>{
    if(userData){
      if(userData.companys_joined.length){
        setPrimaryColor(userData.companys_joined[0].primary_color);
        setSecundaryColor(userData.companys_joined[0].secundary_color);
        setLogo(`${URL}/files/${userData.companys_joined[0].logo}`);
        setNameUser(userData.full_name);
      }

    }

  }, [userData]);

  //Register student  
  const { success, loadingList, loadingRegister, error, data, loadingCall, loadingChange, loadingRemove } = useSelector((state) => state.student);
  
  const dispatch = useDispatch();

  const [ showModal, setShowModal ] = useState(false);

  const [ name, setName ] = useState('');
  const [ identification_number, setIdentification_number ] = useState(0);

  const [ disabledSubmit, setDisabledSubmit ] = useState(true);

  const [ classNameSelected, setClassNameSelected ] = useState(null);
  const [ classIdSelected, setClassIdSelected ] = useState(null);

  const handleSubmit = () => {
    const data = {
      name,
      identification_number,
      classId: classIdSelected
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
      setClassNameSelected(className);
      setClassIdSelected(classId);
    }

  }, [dispatch, classId, className]);

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
    const filled = students.filter((student) => student.present == null).length;

    setDisabledSubmitCall(true);

    if(filled == 0 && students.length !== 0){
      setDisabledSubmitCall(false);
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
    );
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
      classId: classIdSelected,
      year: yearSelected,
      month: monthSelected
    };
  
    dispatch(generated(data));

  };

  const printToFile = async (data) => {

    /**Start: Remover todas as datas que não possui nenhum registro de chamada */
    const dates = Object.keys(data[Object.keys(data)[0]]).reduce((acc, key) => {
      acc[key] = []; // Define cada chave com um array vazio
      return acc;
    }, {});

    Object.values(data).forEach((obj)=>{
      Object.keys(dates).map((date) => dates[date].push(obj[date]));
    });

    const dataNotNull = [];
    Object.keys(dates).forEach((date)=>{
      if(dates[date].every(element => element === null)){
        dataNotNull.push(date);
      }
    });

    for (const person in data) {
      dataNotNull.forEach(date => {
        delete data[person][date];
      });
    }

    let globalTotalPresences = 0;
    let globalValidDates = 0;
  
    const filteredData = {};
    for (const person in data) {
      filteredData[person] = {}; // Inicializar o objeto para cada pessoa
      let totalPresences = 0; // Contador de presenças
      let validDates = 0; // Contador de datas válidas
    
      Object.keys(data[person]).forEach((date) => {
        if (!dataNotNull.includes(date)) {
          const value = data[person][date];
          filteredData[person][date] = value;
    
          // Contar somente os valores não nulos
          if (value !== null) {
            totalPresences += value;
            globalTotalPresences += value;
            validDates++;
            globalValidDates++;

          }
        }
      });
    
      // Calcular a média de presença e adicionar ao objeto
      filteredData[person]['(%) presença'] = validDates > 0 
        ? ((totalPresences / validDates) * 100).toFixed(2) + ' %' 
        : '0%';
    }

    let mean = globalValidDates > 0 ? ((globalTotalPresences / globalValidDates) * 100).toFixed(2) + ' %' : '0%';

    //Quantidade de datas
    const dates_lengths = Object.keys(filteredData[Object.keys(filteredData)[0]]).length - 1;   

    /**End: Remover todas as datas que não possui nenhum registro de chamada */    

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
    
    Object.keys(filteredData).forEach((al) => {
      obj[al] = breakObjectInParts(filteredData[al], 6);
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
              font-size: 12px;
              margin: 20px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 0.9em;
              font-family: sans-serif;
              margin-top: 20px;
            }

            table thead tr {
              background-color: ${primaryColor};
              color: #ffffff;
              text-align: left;
            }

            table th,
            table td {
              padding: 12px 15px;
            }

            table tbody tr {
              border-bottom: 1px solid #dddddd;
            }

            table tbody tr:nth-of-type(even) {
              background-color: #f3f3f3;
            }

            table tbody tr:last-of-type {
              border-bottom: 2px solid ${primaryColor};
            }

            table tbody tr.active-row {
              font-weight: bold;
              color: ${primaryColor};
            }

            .report-head {
              min-height: 45px;
              margin-bottom: 20px;
            }

            .report-title {
              display: flex;
              flex-direction: column-reverse;
              color: ${primaryColor};
            }

            .report-logo {
              width: 75px;
              height: 45px;
            }

            .report-logo img {
              width: 100%;
              height: 100%;
            }

            .report-body ul {
              margin: 0;
              padding: 0;
              list-style-type: none;
            }            
          </style>
      </head>
      
      <body>
        <div class="report-head">
            <div class="report-title">
                <h3>Relatório de presença</h3>
                <div class="report-logo">
                  <img src="${logo}" alt="logo">
                </div>
            </div>
            <div class="report-body">
                <ul>
                    <li>Turma: ${classNameSelected}</li>
                    <li>Data de emissão: ${currentDate} ${currentHour}</li>
                    <li>Usuário que gerou o relatório: ${nameUser}</li>
                    <li>Quantidade de datas: ${dates_lengths}</li>
                    <li>Média geral de participação: ${mean}</li>
                </ul>
            </div>
        </div>
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
                            if(col !== '(%) presença'){
                              const [year, month, day] = col.split('-');
                              return `<th>${day}/${month}/${year}</th>`
                            }

                            return `<th>${col}</th>`

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
                                
                                if(col == '(%) presença'){
                                  return `<td style="font-size: .9em;font-weight: 600;color: #767676;">${filteredData[row][col]}</td>`
                                }

                                if(filteredData[row][col] == null){
                                  return `<td>-</td>`
                                }

                                return `<td>${filteredData[row][col] ? '<span style="color:0dbf2d">Presente</span>': '<span style="color:bf0d0d">Falta</span>'}</td>`

                              }).join('')
                            }
                          </tr>                    
                        `).join('')
                      }      
                  </tbody>
              </table>`              
            }).join('')
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
    //Limpar estudante assim que abre a página
    setStudents([]);

    //Desabilitar o botão assim que entra na ágina
    setDisabledSubmitCall(true);

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


  const currentRouteName = useNavigationState((state) => {
    const parentRoute = state.routes[state.index];

    if(parentRoute.state){
      const subRoute = parentRoute.state.routes[parentRoute.state.index];
      return subRoute.name;

    } 

    return parentRoute.name;

  });

  //Passar dinamicamente a lista de estudantes para a pagina CallRegister
  useEffect(() => {
    navigation.navigate(currentRouteName, 
      { 
        screen: currentRouteName, params: {
          students,
          disabled: disabledSumitCall
        }
      }
    );

  }, [students, disabledSumitCall, currentRouteName]);

  //Alteração dos dados de estudantes
  const [ showModalEditStudent, setShowModalEditStudent ] = useState(false);
  const [ idEditStudent, setIdEditStudent ] = useState('');  
  const [ nameEditStudent, setNameEditStudent ] = useState('');
  const [ identificationNumber, setIdentificationNumber ] = useState('');

  const handleEditStudent = (student) => {
    //Definir os dados para serem editados.
    setNameEditStudent(student.name);
    setIdEditStudent(student.id);
    setIdentificationNumber(student.identification_number.toString());
    //Abrir o modal
    setShowModalEditStudent(true);
  };

  const handleSubmitEditStudent = () => {
    const data = {
      name: nameEditStudent,
      identification_number: identificationNumber
    };
    
    dispatch(change({student: idEditStudent, data}));

  };

  useEffect(()=>{
    if(!loadingChange){
      setShowModalEditStudent(false);
    }

  }, [loadingChange]);

  //Remover aluno
  const [ showModalRemoveStudent, setShowModalRemoveStudent ] = useState(false);
  const [ studentNameRemove, setStudentNameRemove ] = useState('');
  const [ studentIdRemove, setStudentIdRemove ] = useState(null);

  //Definir o usuário que será removido e será aberto o modal
  const handleRemoveStudent = (item) => {
    if(item){
      setStudentNameRemove(item.name);
      setStudentIdRemove(item.id);

      setShowModalRemoveStudent(true);

    }

  };

  //Remover o aluno
  const submitRemoveStudent = () => {
    if(studentIdRemove){
      dispatch(remove(studentIdRemove));
    }

  };

  useEffect(() => {
    if(!loadingRemove){
      setShowModalRemoveStudent(false);
    }

  }, [loadingRemove])

  return (
    <>
      {
        loading ? <LoadingPage/> : (
          <Container>
            {(showModal || showModalCall || showModalReport || showModalEditStudent || showModalRemoveStudent) && <Fade/>}
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
                    <ModalResume>Nos campos abaixo, adicione os dados do aluno para que deseja cadastrado e clique em 'Adicionar'.</ModalResume>
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
            <Modal
              transparent={true}
              animationType='slide'
              visible={showModalEditStudent}
              onRequestClose={() => setShowModalEditStudent(false)}
            >
              <TouchableWithoutFeedback onPress={() => setShowModalEditStudent(false)}>
                <ModalView>
                  <ModalContent>
                    <ModalTitle style={{color: primaryColor}}>Alterar dados do aluno</ModalTitle>
                    <ModalResume>Nos campos abaixo, altere os dados do aluno e clique em 'Alterar'.</ModalResume>
                    <InputForm label='Nome do aluno' value={nameEditStudent} setValue={setNameEditStudent} color={primaryColor}></InputForm>
                    <InputForm label='CPF do aluno' value={identificationNumber} setValue={setIdentificationNumber} color={primaryColor}></InputForm>
                    <View style={{marginTop: 20}}>
                      <ButtonLg title='Alterar' loading={loadingChange} color={primaryColor} fontColor={'#fff'} largeWidth='300px' action={handleSubmitEditStudent}/>
                    </View>                    
                  </ModalContent>
                </ModalView>
              </TouchableWithoutFeedback>
            </Modal>
            <Modal
              transparent={true}
              animationType='slide'
              visible={showModalRemoveStudent}
              onRequestClose={() => setShowModalRemoveStudent(false)}
            >
              <TouchableWithoutFeedback onPress={() => setShowModalRemoveStudent(false)}>
                <ModalView>
                  <ModalContent>
                    <ModalTitle style={{color: primaryColor}}>Deseja remover a turma ?</ModalTitle>
                    <ModalResume>Ao clicar no botão abaixo, você irá excluir o aluno <Text style={{fontWeight: "bold"}}>"{studentNameRemove}"</Text>. Cuidado, essa ação pode ser inreversível!</ModalResume>
                    <View style={{marginTop: 20}}>
                      <ButtonLg title='Remover' loading={loadingRemove} color={'#e3222c'} fontColor={'#fff'} largeWidth='300px' action={submitRemoveStudent}/>
                    </View>                                      
                  </ModalContent>
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
                  <InfoName style={{color:primaryColor}}>{classNameSelected}</InfoName>
                </InfoText>
                <InfoText>
                  <SimpleLineIcons name='calendar' size={18} color={primaryColor}/>
                  <InfoName style={{color:primaryColor}}>{currentDate}</InfoName>
                </InfoText>          
              </InfoArea>
              <ToolsArea>
                <BoxAction action={() => setShowModal(true)} color={primaryColor} iconName={'person-add'} title={'Adicionar aluno'}></BoxAction>
                <BoxAction action={() => setShowModalReport(true)} color={primaryColor} iconName={'download'} title={'Baixa relatório'}></BoxAction>
                <BoxAction 
                  color={currentRouteName == 'CallRegister' ? '#f0f2f5': primaryColor}
                  iconName={'notifications'}
                  title={'Registrar chamada'}
                  disabled={disabledSumitCall}
                  action={() => navigation.navigate('CallRegister')}
                  backgroundColor={currentRouteName == 'CallRegister' ? primaryColor: '#f0f2f5'}
                />
                <BoxAction
                  color={currentRouteName == 'EditStudent' ? '#f0f2f5': primaryColor}
                  iconName={'pencil-sharp'}
                  title={'Editar aluno'}
                  action={() => navigation.navigate('EditStudent')}
                  backgroundColor={currentRouteName == 'EditStudent' ? primaryColor: '#f0f2f5'}
                />
                <BoxAction
                  color={currentRouteName == 'RemoveStudent' ? '#f0f2f5': primaryColor}
                  iconName={'person-remove'}
                  title={'Remover aluno'}
                  action={() => navigation.navigate('RemoveStudent')}
                  backgroundColor={currentRouteName == 'RemoveStudent' ? primaryColor: '#f0f2f5'}
                />                                           
              </ToolsArea>
              <Stack.Navigator>
                <Stack.Screen
                  name="CallRegister"
                  component={CallRegister}
                  initialParams={{ 
                    students,
                    color: primaryColor,
                    disabled: disabledSumitCall,
                    actionItem: handleCall, 
                    action: handleCallRegister
                  }}
                  options={{
                    headerShown: false,
                  }}                  
                />
                <Stack.Screen
                  name="EditStudent"
                  component={EditStudent}
                  initialParams={{
                    students,
                    color: primaryColor,
                    actionItem: handleEditStudent
                  }}
                  options={{
                    headerShown: false
                  }}                  
                />
                <Stack.Screen
                  name="RemoveStudent"
                  component={RemoveStudent}
                  initialParams={{
                    students,
                    color: primaryColor,
                    actionItem: handleRemoveStudent
                  }}
                  options={{
                    headerShown: false
                  }}                  
                />                              
              </Stack.Navigator>
            </Body>
          </Container>
        )
      }
    </>
  )
};

export default Call;