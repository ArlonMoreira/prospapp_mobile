import { Modal, TouchableWithoutFeedback, View } from 'react-native';
//Hooks
import { useSelector, useDispatch } from 'react-redux';
import useKeyboardStatus from '../../hooks/useKeyboardStatus';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import useCurrentDate from '../../hooks/useCurrentDate';
import useUtil from '../../hooks/useUtil';
import { useState, useEffect, useRef } from 'react';
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
import Select from '../../components/Select';
import TitleArea from '../../components/TitleArea';
import SearchArea from '../../components/SearchArea';
//Redux
import { list, remove, resetState } from '../../slices/pointLocalsSlice';
import { listUsersManager } from '../../slices/managerSlice';
import { resetReportState, generated } from '../../slices/reportPointSlice';
//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Styles
import { Body } from '../ElectronicCall/styles';
import { ModalView, ModalContent, ModalTitle, ModalResume } from '../ElectronicCall/styles';
import { ToolsArea } from '../ElectronicCall/styles';
import { Container } from './styles';
import { SelectContainer } from './styles';
//PDF
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const URL = process.env.EXPO_PUBLIC_API_URL;

const Stack = createNativeStackNavigator();

const ElectronicPoint = () => {

  const searchRef = useRef();  

  const { formatDate } = useUtil();

  const { currentDate, currentHour } = useCurrentDate();  

  const keyboardVisible = useKeyboardStatus();

  const { userData } = useSelector((state) => state.me);
  const [ primaryColor, setPrimaryColor ] = useState('#fff');
  const [ staffPerfil, setStaffPerfil ] = useState(false);
  const [ companyId, setCompanyId ] = useState();
  const [ logo, setLogo ] = useState(null);

  //Limpar estados iniciais
  useEffect(() => {
    dispatch(resetState());
  }, []);
  
  //Alimenta com os dados padrão da empresa e usuário.
  useEffect(()=>{
    if(userData){

      if(userData.role == 'Gestor') setStaffPerfil(true);

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
    if(successRemove) {
      setShowModal(false);
      searchRef.current && searchRef.current.clear();
    }

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

  //Busca textual
  const [ dataFiltered, setDataFiltered ] = useState([]);

  useEffect(() => setDataFiltered(locals), [ locals ]);  

  //Encaminhar parametros dinamicamnete
  useEffect(() => {
    navigation.navigate(currentRouteName, //Renavegar até a página atual
      {
        screen: currentRouteName, params: {
          data: dataFiltered
        }
      }
    );

  }, [dataFiltered, currentRouteName]); //Quando atualizar o dado vai renavegar pra página que estiver selecionada

  //Scroll
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

  };

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
  const [ monthsOptions, setMonthsOptions ] = useState([]);

  useEffect(() => {
    if(companyId){
      dispatch(listUsersManager(companyId));
    }
  }, [companyId]);

  useEffect(() => {
    if(users && users.length > 0){
      if(staffPerfil){
        setUserOptions(users.map(obj => 
          (
            {
              'value': obj.user_id,
              'label': obj.full_name
            }
          )
        ));
      } else {
        const option = users.filter(option => option.email === userData.email)[0];
        setUserOptions([{
          'value': option.user_id,
          'label': option.full_name      
        }]);
      }

    }

  }, [users, staffPerfil]);

  useEffect(() => {
    if(usersOptions.length > 0){
      setUserSlelected(usersOptions[0].value);
    }

  }, [usersOptions]);

  useEffect(() => {
    //Obter data atual
    const currentTime = new Date();

    //Criar uma lista com todos os anos incluindo o ano atual
    const year = Array.from({ length: 3 }, (_, i) => currentTime.getFullYear() - i);
    const yearOptions = year.map(op => { return { label: op.toString(), value: op.toString() } });
    setYearOptions(yearOptions);
    setYearSelected(year);

    // Criar uma lista com os 12 meses do ano no formato '01' a '12'
    const currentMonth = (currentTime.getMonth() + 1).toString().padStart(2, '0'); // '01' a '12'

    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

    const monthOptions = months.map(m => ({
      label: m,
      value: m
    }));

    setMonthsOptions(monthOptions);
    setMonthSelected(currentMonth); // Seleciona o mês atual por padrão 

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
  const { data:dataReport, loading:loadingReport, success: successReport } = useSelector(state => state.reportPoint);

  const closeModalReport = () => {
    if(!loadingReport){
      setShowModalReport(false);
    }
  };

  const printToFile = (data) => {

    const user = usersOptions.length > 0 && usersOptions.filter(user => user.value == userSelected)[0].label;

    const total_hours = Object.values(data).reduce((total, points) => {
      return total + points.reduce((sum, point) => {
        if (point.is_justify === false && typeof point.hours_worked === 'number') {
          return sum + point.hours_worked;
        }
        return sum;
      }, 0);
    }, 0);

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

              table th,
              table tr {
                  width: 10%;
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

              table tbody tr.active-row, h3 {
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
                  color: #0C6661;
                  margin-top: 20px;
              }

              .report-logo {
                width: 75px;
                height: 45px;
              }

              .report-logo img {
                width: 100%;
                height: 100%;
              }

              .report-body {
                  margin-bottom: 20px;
                  padding-bottom: 20px;
                  border-bottom: 1px solid #ccc;
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
                  <li>Colaborador: ${user}</li>
                  <li>Data de emissão: ${currentDate} ${currentHour}</li>
                  <li>Período selecionado: ${yearSelected}/${monthSelected}</li>
                  <li>Total de horas: ${total_hours.toFixed(2)}</li>
                </ul>
              </div>
              ${
                Object.keys(data).map(key => {
                  return `
                    <div class="report-section">
                      <h3>${key}</h3>
                      <table>
                        <thead>
                          <tr>
                            <th>Data</th>
                            <th>Dia da Semana</th>
                            <th>Entrada</th>
                            <th>Saída</th>
                            <th>Horas trabalhadas</th>
                            <th style="max-width: 100px">Justificativa</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${
                            data[key].map(object => {
                              return `
                                <tr style="opacity: ${!object.is_justify ? 1: .5}">
                                  <td>${ formatDate(object.date) }</td>
                                  <td>${ object.dayOfWeek }</td>
                                  <td>${ object.entry_datetime }</td>
                                  <td>${ object.exit_datetime ? object.exit_datetime : '-' }</td>
                                  <td>${ object.is_justify ? '-' : object.hours_worked ? object.hours_worked : 0 }</td>
                                  <td>${ object.justify_description ? object.justify_description: '-' }</td>
                                </tr>
                              `;
                            }).join('')
                          }
                        </tbody>
                      </table>
                    </div>
                  `;              
                }).join('')
              }
        </body>
      
      </html>    
    `;

    return {
      html
    };

  };

  useEffect(() => {
    if(successReport){

      const { html } = printToFile(dataReport);

      const sharePdf = async(html) => {
        const { uri } = await Print.printToFileAsync({ html });
  
        await shareAsync(uri, { 
          UTI: '.pdf',
          mimeType: 'application/pdf'
        });

        dispatch(resetReportState()); //Reiniciar o estado do relatório quando o mesmo for gerado com sucesso
        closeModalReport();

      };

      sharePdf(html);

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
                      <Select 
                        label={'Usuário'}
                        color={ primaryColor }
                        options={ usersOptions }
                        setSelected={ setUserSlelected }
                        zIndex={100}
                      />                      
                    </View>
                    <SelectContainer>
                      <View style={{ width: '49%' }}>
                        <Select 
                          label={'Ano'}
                          color={ primaryColor }
                          options={ yearsOptions }
                          setSelected={ setYearSelected }
                          zIndex={50}
                        />
                      </View>                      
                      <View style={{ width: '49%' }}>
                        <Select 
                          label={'Mês'}
                          color={ primaryColor }
                          options={ monthsOptions }
                          setSelected={ setMonthSelected }
                          valueSelected={ monthSelected }
                          zIndex={50}
                        />                        
                      </View>
                    </SelectContainer>
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
            <Header themeColor={primaryColor}/>
            <Body>
                <>
                  <TitleArea color={ primaryColor } title={ 'Locais de Ponto' } />
                  <SearchArea ref={ searchRef } color={ primaryColor } placeholder='Busque aqui pelo local desejado.' data={ locals } setDataFiltered={ setDataFiltered }/>
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
                        <BoxAction 
                          color={primaryColor}
                          iconName={'download'}
                          action={() => setShowModalReport(true)}
                          title={'Baixa relatório'}
                        ></BoxAction>                                              
                        {
                          staffPerfil && (
                          <>
                            <BoxAction
                              color={currentRouteName == 'RegisterLocalPoint' ? '#f0f2f5': primaryColor}
                              backgroundColor={currentRouteName !== 'RegisterLocalPoint' ? '#f0f2f5': primaryColor}
                              iconName={'add-circle'}
                              title={'Adicionar Local'}
                              action={() => navigation.navigate('RegisterLocalPoint', { color: primaryColor, companyId, searchRef })}
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
                <Stack.Navigator>
                  <Stack.Screen
                    name="ListLocals"
                    component={ListLocals}
                    initialParams={{
                      data: dataFiltered,
                      color: primaryColor,
                      logo: logo
                    }}
                    options={{
                      headerShown: false,
                    }}               
                  />
                  <Stack.Screen
                    name="EditLocals"
                    component={EditLocals}
                    initialParams={{
                      data: dataFiltered,
                      color: primaryColor,
                      companyId,
                      searchRef
                    }}          
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="RemoveLocals"
                    component={RemoveLocals}
                    initialParams={{
                      data: dataFiltered,
                      color: primaryColor,
                      actionItem: handleRemoveLocal
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