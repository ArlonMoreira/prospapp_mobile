import React, { useState, useEffect, useRef } from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
//Hooks
import { useSelector, useDispatch } from 'react-redux';
import useKeyboardStatus from '../../hooks/useKeyboardStatus';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import useCurrentDate from '../../hooks/useCurrentDate';
//Pages
import ListLocals from './ListLocals';
import EditLocals from './EditLocals';
import RegisterLocal from './RegisterLocal';
import RemoveLocals from './RemoveLocals';
//Components
import Header from '../../components/Header';
import LoadingPage from '../../components/LoadingPage';
import Fade from '../../components/Fade';
import ButtonLg from '../../components/ButtonLg';
import BoxAction from '../../components/BoxAction';
//Redux
import { list, remove } from '../../slices/pointLocalsSlice';
import { listUsersManager } from '../../slices/managerSlice';
import { resetReportState, generated } from '../../slices/reportPointSlice';
//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Styles
import { StatusBar } from 'expo-status-bar';
import { 
  Body,
  TitleAreaPage,
  TitlePage
} from '../ElectronicCall/styles';
import { 
  ModalView,
  ModalContent,
  ModalTitle,
  ModalResume
} from '../ElectronicCall/styles';
import { 
  ToolsArea
} from '../ElectronicCall/styles';
import { Container } from './styles';
import { Select } from '../Call/styles';
import { LabelSelect, SelectContainer } from './styles';
//PDF
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const URL = process.env.EXPO_PUBLIC_API_URL;

const Stack = createNativeStackNavigator();

const ElectronicPoint = () => {

  const { currentDate, currentHour } = useCurrentDate();  

  const keyboardVisible = useKeyboardStatus();

  const { userData } = useSelector((state) => state.me);
  const [ primaryColor, setPrimaryColor ] = useState('#fff');
  const [ staffPerfil, setStaffPerfil ] = useState(false);
  const [ companyId, setCompanyId ] = useState();
  const [ logo, setLogo ] = useState(null);
  
  //Alimenta com os dados padrão da empresa e usuário.
  useEffect(()=>{
    if(userData){

      if(userData.is_staff) setStaffPerfil(true);

      if(userData.companys_joined.length){
        setPrimaryColor(userData.companys_joined[0].primary_color);
        setCompanyId(userData.companys_joined[0].company_id_annotated);
        setLogo(`${URL}/files/${userData.companys_joined[0].logo}`);        
        if(userData.companys_joined[0].role == 'Gestor') setStaffPerfil(true);

      }

    }

  }, [userData]);  

  //Carregar locais de ponto
  const dispatch = useDispatch();
  const { loading, data: locals, loadingRemove, successRemove } = useSelector(state => state.pointLocals);
  
  //Carregr locais de ponto
  useEffect(() => {
    if(companyId){
      dispatch(list(companyId));
    }
    
  }, [companyId]);

  //Modal pra remover locais de ponto
  const [ showModal, setShowModal ] = useState(false);
  const [ localSelected, setLocalSelected ] = useState(null);

  const handleRemoveLocal = (local) => {
    setShowModal(true);
    setLocalSelected(local);
  };

  const submitRemoveLocal = () => {
    dispatch(remove(localSelected.id));
  };

  useEffect(() => {
    if(successRemove) setShowModal(false);
  }, [successRemove]);

  //Rotas de navegação
  const navigation = useNavigation();

  const currentRouteName = useNavigationState((state) => {
    const parentRoute = state.routes[state.index];

    if(parentRoute.state){
      const subRoute = parentRoute.state.routes[parentRoute.state.index];
      return subRoute.name;

    }

    return parentRoute.name;

  });

  //Encaminhar parametros dinamicamnete
  useEffect(() => {
    navigation.navigate(currentRouteName, //Renavegar até a página atual
      {
        screen: currentRouteName, params: {
          data: locals
        }
      }
    );

  }, [locals, currentRouteName]); //Quando atualizar o dado vai renavegar pra página que estiver selecionada

  //Scroll
  const [showTools, setShowTools] = useState(true);
  const scrollOffsetY = useRef(0);
  const debounceTimeout = useRef(null);
  const nameRef = useRef(null);
  
  const handleScroll = (event) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    const isAtTop = currentOffsetY == 0;
    scrollOffsetY.current = currentOffsetY;
  
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (!isAtTop) {
      setShowTools(false);
    }

    debounceTimeout.current = setTimeout(() => {
      if (isAtTop) {
        setShowTools(true);
      }
    }, 100); // ajusta o delay conforme necessidade

  };

  //Focar no primeiro input ao scroolar pro topo
  useEffect(() => {
    if(showTools) nameRef.current?.focus();
  }, [showTools]);

  //Gerar relatório
  const [ showModalReport, setShowModalReport ] = useState(false);
  //Usuário relatório
  const [ userSelected, setUserSlelected ] = useState(null);
  const { data: users } = useSelector((state) => state.manager);
  const [ usersOptions, setUserOptions ] = useState([]);
  //Ano relatório
  const [ yearSelected, setYearSelected ] = useState([]);  
  const [ yearsOptions, setYearOptions ] = useState([]);  
  //Mês relatório
  const [ monthSelected, setMonthSelected ] = useState([]);
  const [ monthsOptiopns ] = useState(['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']);

  useEffect(() => {
    if(companyId){
      dispatch(listUsersManager(companyId));
    }
  }, [companyId]);

  useEffect(() => {
    if(users && users.length > 0){
      setUserOptions(users.map(obj => 
        (
          {
            'value': obj.user_id,
            'label': obj.full_name
          }
        )
      ));
    }

  }, [users]);

  useEffect(() => {
    if(usersOptions.length > 0){
      setUserSlelected(usersOptions[0].value);
    }

  }, [usersOptions]);

  useEffect(() => {
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

  const handleReportGenerated = () => {
    const data = {
      "user_id": userSelected,
      "year": yearSelected,
      "month": parseInt(monthSelected)
    }

    dispatch(generated(data));

  };

  //Gerar relatório
  const { data: dataReport } = useSelector(state => state.reportPoint);

  const printToFile = (data) => {
    console.log('data', data)
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
                  <h3>Relatório de ponto</h3>
                  <div class="report-logo">
                    <img src="${logo}" alt="logo">
                  </div>
              </div>
              <div class="report-body">
                <ul>
                  <li>Colaborador: ${ usersOptions.filter(user => user.value == userSelected)[0].label }</li>
                  <li>Data de emissão: ${currentDate} ${currentHour}</li>
                  <li>Período selecionado: ${yearSelected}/${monthSelected}</li>
                </ul>
              </div>
          </div>

        </body>
      
      </html>    
    `

    return {
      html
    };

  };

  useEffect(() => {
    if(dataReport){
      const { html } = printToFile(dataReport);
      console.log('html', html)
    }

  }, [dataReport]);

  return (
    <>
      {
        loading ? <LoadingPage backgroundColor={primaryColor} logo={logo}/> : (
          <Container>
            {
              (showModal || showModalReport) && <Fade/>
            }
            <Modal
              transparent={true}
              animationType='slide'
              visible={showModalReport}
              onRequestClose={() => setShowModalReport(false)} //Permite fechar o modal quando clicado em uma área fora      
            >
              <TouchableWithoutFeedback onPress={() => setShowModalReport(false)}>
                <ModalView>
                  <ModalContent>
                    <ModalTitle style={{color: primaryColor}}>Gerar relatório de ponto</ModalTitle>
                    <ModalResume>Selecione o usuário e o período que deseja gerar o relatório.</ModalResume>
                    <View style={{width: '100%', marginTop: 20}}>
                      <LabelSelect style={{ color: primaryColor }}>Usuário</LabelSelect>
                      <Select>
                        <Picker
                          selectedValue={userSelected}
                          style={{
                            backgroundColor: 'transparent', // deixa o Picker sem cor
                            width: '100%',
                            height: '100%'
                          }}
                          onValueChange={(itemValue) => setUserSlelected(itemValue)}
                        >
                          {
                            usersOptions.map((option, i) => <Picker.Item key={i} value={option.value} label={option.label}/>)
                          }
                        </Picker>                      
                      </Select>                       
                    </View>
                    <SelectContainer style={{ width: '100%', marginTop: 20 }}>
                      <View style={{width: '44%'}}>
                        <LabelSelect style={{ color: primaryColor }}>Ano</LabelSelect>
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
                      </View>                      
                      <View style={{width: '44%'}}>
                        <LabelSelect style={{ color: primaryColor }}>Mês</LabelSelect>
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
                      </View>
                    </SelectContainer>
                    <View style={{marginTop: 20}}>
                      <ButtonLg title='Salvar e compartilhar' color={primaryColor} fontColor={'#fff'} largeWidth='300px' action={handleReportGenerated}/>
                    </View>                                           
                  </ModalContent>
                </ModalView>
              </TouchableWithoutFeedback>
            </Modal>              
            <Modal
              transparent={true}
              animationType='slide'
              visible={showModal}
              onRequestClose={() => setShowModal(false)} //Permite fechar o modal quando clicado em uma área fora      
            >
              <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                <ModalView>
                  <ModalContent>
                    <ModalTitle style={{color: primaryColor}}>Deseja remover o local ?</ModalTitle>
                    <ModalResume>Ao clicar no botão abaixo, você irá excluir o local. Cuidado, essa ação pode ser inreversível!</ModalResume>
                    <View style={{marginTop: 20}}>
                      <ButtonLg loading={loadingRemove} disabled={loadingRemove} title='Remover' color={'#e3222c'} fontColor={'#fff'} largeWidth='300px' action={submitRemoveLocal}/>
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
                {
                  showTools && (
                    <>
                      <TitleAreaPage>
                        <TitlePage style={{color: primaryColor}}>Locais de Ponto</TitlePage>
                      </TitleAreaPage>
                      {
                        !keyboardVisible && (
                          <ToolsArea>
                            <BoxAction
                              color={currentRouteName == 'ListLocals' ? '#f0f2f5': primaryColor}
                              backgroundColor={currentRouteName !== 'ListLocals' ? '#f0f2f5': primaryColor}
                              iconName={'alarm-sharp'}
                              action={() => navigation.navigate('ListLocals')}
                              title={'Registar ponto'}
                            />                         
                            {
                              staffPerfil && (
                              <>
                                <BoxAction 
                                  color={primaryColor}
                                  iconName={'download'}
                                  action={() => setShowModalReport(true)}
                                  title={'Baixa relatório'}
                                ></BoxAction>
                                <BoxAction
                                  color={currentRouteName == 'RegisterLocal' ? '#f0f2f5': primaryColor}
                                  backgroundColor={currentRouteName !== 'RegisterLocal' ? '#f0f2f5': primaryColor}
                                  iconName={'add-circle'}
                                  title={'Adicionar Local'}
                                  action={() => navigation.navigate('RegisterLocal', { color: primaryColor })}
                                />
                                <BoxAction
                                  color={(currentRouteName == 'EditLocals' || currentRouteName == 'EditLocal') ? '#f0f2f5': primaryColor}
                                  backgroundColor={(currentRouteName !== 'EditLocals' && currentRouteName !== 'EditLocal') ? '#f0f2f5': primaryColor}
                                  iconName={'pencil-sharp'}
                                  action={() => navigation.navigate('EditLocals')}
                                  title={'Editar Local'}
                                />
                                <BoxAction
                                  color={currentRouteName == 'RemoveLocals' ? '#f0f2f5': primaryColor}
                                  backgroundColor={currentRouteName !== 'RemoveLocals' ? '#f0f2f5': primaryColor}
                                  iconName={'close-circle'}
                                  action={() => navigation.navigate('RemoveLocals')}
                                  title={'Remover Local'}
                                />                         
                              </>
                              )
                            }                                     
                          </ToolsArea>
                        )
                      }                    
                    </>
                  )
                }
                <Stack.Navigator>
                  <Stack.Screen
                    name="ListLocals"
                    component={ListLocals}
                    initialParams={{
                      data: locals,
                      color: primaryColor,
                      logo: logo,
                      setShowTools
                    }}
                    options={{
                      headerShown: false,
                    }}               
                  />
                  <Stack.Screen
                    name="EditLocals"
                    component={EditLocals}
                    initialParams={{
                      data: locals,
                      color: primaryColor,
                      setShowTools
                    }}          
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="EditLocal"
                    component={RegisterLocal}
                    initialParams={{
                      color: primaryColor,
                      companyId,
                      handleScroll,
                      nameRef
                    }}               
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="RegisterLocal"
                    component={RegisterLocal}
                    initialParams={{
                      color: primaryColor,
                      companyId,
                      handleScroll,
                      nameRef
                    }}               
                    options={{
                      headerShown: false,
                    }}
                  />           
                  <Stack.Screen
                    name="RemoveLocals"
                    component={RemoveLocals}
                    initialParams={{
                      data: locals,
                      color: primaryColor,
                      actionItem: handleRemoveLocal,
                      setShowTools
                    }}               
                    options={{
                      headerShown: false,
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

export default ElectronicPoint;