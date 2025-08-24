import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
//Components
import Header from '../../components/Header';
import Fade from '../../components/Fade';
import InputForm from '../../components/InputForm';
import ButtonLg from '../../components/ButtonLg';
import Alert from '../../components/Alert';
import BoxAction from '../../components/BoxAction';
import LoadingPage from '../../components/LoadingPage';
import SearchArea from '../../components/SearchArea';
import TitleArea from '../../components/TitleArea';
//Pages
import ListClass from './ListClass';
import EditClass from './EditClass';
import RemoveClass from './RemoveClass';
import RelateUser from './RelateUser';
//Hooks
import { useNavigation } from '@react-navigation/native';
//Context
import { LoadingContext } from '../../contexts/LoadingContext';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { register, list, change, remove, resetChangeForm, resetState } from '../../slices/classSlice';
//Styles
import { 
  Container,
  Body,
  ToolsArea,
  ModalView,
  ModalContent,
  ModalTitle,
  ModalResume
} from './styles';
import { Errors, Error } from '../Register/styles';
//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigationState } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const URL = process.env.EXPO_PUBLIC_API_URL;

const ElectronicCall = () => {

  const { loading, setLoading } = useContext(LoadingContext);

  const navigation = useNavigation();  

  const { userData } = useSelector((state) => state.me);

  const [ primaryColor, setPrimaryColor ] = useState('#fff');
  const [ company, setCompany ] = useState(null);
  const [ logo, setLogo ] = useState(null);
  
  useEffect(()=>{
    if(userData){
      if(userData.companys_joined.length){
        setPrimaryColor(userData.companys_joined[0].primary_color);
        setCompany(userData.companys_joined[0].company_id_annotated);
        setLogo(`${URL}/files/${userData.companys_joined[0].logo}`);
      }

    }

  }, [userData]);  

  //Register class
  const { success, loadingRegister, errorRegister, data, loadingList, loadingChange, loadingRemove, successChange, errorsChange } = useSelector((state) => state.class);
  
  const dispatch = useDispatch();

  const [ showModal, setShowModal ] = useState(false);

  const [ name, setName ] = useState('');

  const [ disabledSubmit, setDisabledSubmit ] = useState(true);

  useEffect(() => {
    //Resetar todos os estados
    dispatch(resetState());

  }, []);

  const handleSubmit = () => {
    if(company){
      const data = {
        company,
        name
      };

      dispatch(register(data));
    }
    
  };

  useEffect(()=>{
    if(!errorRegister){
      if(!loadingRegister){ //Fechar o modal quando finalizar o cadastro
        setShowModal(false);
      } else { //Desabilitar o botão quando estiver carregando.
        setDisabledSubmit(true);
      }

    } else {
      setDisabledSubmit(false);

    }

  }, [loadingRegister, errorRegister]);

  const closeModal = () => { //Fechar modal
    if(!loadingRegister){
      setShowModal(false);
    }
  };

  useEffect(()=>{ //Limpar o formulário caso ocorrer o cadastro com sucesso.
    if(success){
      setName('');
      dispatch(list(company));      
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
    if(errorRegister){
      setShowAlertError(true);
    } else {
      setShowAlertError(false);
    }

  }, [errorRegister]);

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

  useFocusEffect(
    useCallback(() => {
      if(company){
        dispatch(list(company));
      }

    }, [company])
  );

  //Carregar
  useEffect(() => {
    setLoading(loadingList);
  }, [loadingList]);

  const currentRouteName = useNavigationState((state) => {
    const parentRoute = state.routes[state.index];

    if(parentRoute.state){
      const subRoute = parentRoute.state.routes[parentRoute.state.index];
      return subRoute.name;

    } 

    return parentRoute.name;

  });  

  //Alterar dados da turma
  const [ showModalChange, setShowModalChange ] = useState(false);
  const [ nameForm, setNameForm ] = useState('');
  const [ idForm, setIdForm ] = useState(null);

  const handleChangeClass = (item) => {
    if(item){
      dispatch(resetChangeForm()); //Limpar estados dos formulários ao abrir o modal;

      setNameForm(item.name);
      setIdForm(item.id);

      setShowModalChange(true);
    }

  };

  const submitChangeClass = () => {
    
    dispatch(change({
      classId: idForm,
      data: {
        name: nameForm
      }
    }));

  };

  useEffect(()=>{
    if(successChange){ //Fechar o modal quando editar a turma
      setShowModalChange(false);
    }

  }, [successChange]);

  //Remover turma
  const [ showModalRemove, setShowModalRemove ] = useState(false);
  const [ classNameRemove, setClassNameRemove ] = useState('');
  const [ classIdRemove, setClassIdRemove ] = useState(null);

  const handleRemoveClass = (item) => {
    if(item){
      setClassNameRemove(item.name);
      setClassIdRemove(item.id);

      setShowModalRemove(true);

    }
    
  };

  const submitRemoveClass = () => {
    dispatch(remove(classIdRemove));
  };

  useEffect(() => {
    if(!loadingRemove){
      setShowModalRemove(false);
    }

  }, [loadingRemove]);
  
  //Busca textual
  const [ dataFiltered, setDataFiltered ] = useState([]);

  useEffect(() => setDataFiltered(data), [ data ]);  

  //Encaminhar parametros dinamicamnete
  useEffect(() => {
    navigation.navigate(currentRouteName, //Renavegar até a página atual
      {
        screen: currentRouteName, params: {
          classes: dataFiltered,
          color: primaryColor
        }
      }
    );

  }, [dataFiltered, primaryColor, currentRouteName]); //Quando atualizar o dado vai renavegar pra página que estiver selecionada


  return (
    <>
      {
        loading ? <LoadingPage backgroundColor={primaryColor} logo={logo}/> : (
          <Container style={{ paddingTop: 20 }}>
            {showAlertError && <Alert message='Falha ao cadastrar turma' setShow={setShowAlertError}/>}
            {(showModal || showModalChange || showModalRemove) && <Fade/>}
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
                      <ButtonLg disabled={disabledSubmit} title='Adicionar' loading={loadingRegister} color={primaryColor} fontColor={'#fff'} largeWidth='300px' action={handleSubmit}/>
                    </View>
                  </ModalContent>
                </ModalView>
              </TouchableWithoutFeedback>
            </Modal>
            <Modal
              transparent={true}
              animationType='slide'
              visible={showModalChange}
              onRequestClose={() => setShowModalChange(false)}    
            >
              <TouchableWithoutFeedback onPress={() => setShowModalChange(false)}>
                <ModalView>
                  <ModalContent>
                    <ModalTitle style={{color: primaryColor}}>Alterar turma</ModalTitle>
                    <ModalResume>Alterar dados da turma, e clique no botão "Alterar/Confirmar" para estabelecer a mudança</ModalResume>
                    <InputForm label='Nome da turma' pointerColor={primaryColor} value={nameForm} setValue={setNameForm} color={primaryColor}/>
                    <Errors>
                    { 
                      Object.keys(errorsChange).length > 0 && 
                      Array.isArray(errorsChange?.name) && 
                      errorsChange.name.map((error, i) => <Error key={i} style={{color: 'red'}}>{error}</Error>) 
                    }                      
                    </Errors>
                    <View style={{marginTop: 20}}>
                      <ButtonLg title='Alterar/Confirmar' loading={loadingChange} color={primaryColor} fontColor={'#fff'} largeWidth='300px' action={submitChangeClass}/>
                    </View>             
                  </ModalContent>
                </ModalView>
              </TouchableWithoutFeedback>
            </Modal>
            <Modal
              transparent={true}
              animationType='slide'
              visible={showModalRemove}
              onRequestClose={() => setShowModalRemove(false)}
            >
              <TouchableWithoutFeedback onPress={() => setShowModalRemove(false)}>
                <ModalView>
                  <ModalContent>
                    <ModalTitle style={{color: primaryColor}}>Deseja remover a turma ?</ModalTitle>
                    <ModalResume>Ao clicar no botão abaixo, você irá excluir a tuma "{classNameRemove}". Cuidado, essa ação pode ser inreversível!</ModalResume>
                    <View style={{marginTop: 20}}>
                      <ButtonLg title='Remover' loading={loadingRemove} color={'#e3222c'} fontColor={'#fff'} largeWidth='300px' action={submitRemoveClass}/>
                    </View>
                  </ModalContent>
                </ModalView>
              </TouchableWithoutFeedback>
            </Modal>
            <Header themeColor={primaryColor}/>
            <Body style={{ marginBottom: 30 }}>
              <TitleArea color={ primaryColor } title={'Turmas'}/>
              <SearchArea color={ primaryColor } placeholder='Busque aqui pela turma desejada.' data={ data } setDataFiltered={ setDataFiltered } />
              <ToolsArea>
                <BoxAction 
                  action={() => setShowModal(true)}
                  color={primaryColor}
                  iconName={'add-circle'}
                  title={'Adicionar Turma'}
                />
                <BoxAction
                  color={currentRouteName == 'ListClass' ? '#f0f2f5': primaryColor}
                  backgroundColor={currentRouteName != 'ListClass' ? '#f0f2f5': primaryColor}
                  iconName={'megaphone'}
                  action={() => navigation.navigate('ListClass')}
                  title={'Realizar Chamada'}
                />     
                <BoxAction
                  color={currentRouteName == 'RelateUser' ? '#f0f2f5': primaryColor}
                  backgroundColor={currentRouteName != 'RelateUser' ? '#f0f2f5': primaryColor}
                  iconName={'people-sharp'}
                  action={() => navigation.navigate('RelateUser')}
                  title={'Vincular usuário'}
                />                           
                <BoxAction
                  color={currentRouteName == 'EditClass' ? '#f0f2f5': primaryColor}
                  backgroundColor={currentRouteName != 'EditClass' ? '#f0f2f5': primaryColor}
                  iconName={'pencil-sharp'}
                  action={() => navigation.navigate('EditClass')}
                  title={'Editar Turma'}
                />
                <BoxAction
                  color={currentRouteName == 'RemoveClass' ? '#f0f2f5': primaryColor}
                  backgroundColor={currentRouteName != 'RemoveClass' ? '#f0f2f5': primaryColor}
                  iconName={'close-circle'}
                  action={() => navigation.navigate('RemoveClass')}
                  title={'Remover Turma'}
                />
              </ToolsArea>
              <Stack.Navigator>
                <Stack.Screen
                  name="ListClass"
                  component={ListClass}
                  initialParams={{
                    classes: dataFiltered,
                    color: primaryColor
                  }}
                  options={{
                    headerShown: false,
                  }}                  
                />
                <Stack.Screen
                  name="RelateUser"
                  component={RelateUser}
                  initialParams={{
                    logo,
                    company,
                    classes: dataFiltered,
                    color: primaryColor
                  }}
                  options={{
                    headerShown: false,
                  }}                  
                />                
                <Stack.Screen
                  name="EditClass"
                  component={EditClass}
                  initialParams={{
                    classes: dataFiltered,
                    color: primaryColor,
                    actionItem: handleChangeClass
                  }}
                  options={{
                    headerShown: false,
                  }}                  
                />
                <Stack.Screen
                  name="RemoveClass"
                  component={RemoveClass}
                  initialParams={{
                    classes: dataFiltered,
                    color: primaryColor,
                    actionItem: handleRemoveClass            
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

export default ElectronicCall;