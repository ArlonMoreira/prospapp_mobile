import React, { useState, useEffect, useContext } from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
//Components
import Header from '../../components/Header';
import Fade from '../../components/Fade';
import InputForm from '../../components/InputForm';
import ButtonLg from '../../components/ButtonLg';
import Alert from '../../components/Alert';
import BoxAction from '../../components/BoxAction';
import LoadingPage from '../../components/LoadingPage';
//Pages
import ListClass from './ListClass';
import EditClass from './EditClass';
import RemoveClass from './RemoveClass';
//Hooks
import { useNavigation } from '@react-navigation/native';
//Context
import { LoadingContext } from '../../contexts/LoadingContext';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { register, list, change, remove } from '../../slices/classSlice';
//Styles
import { StatusBar } from 'expo-status-bar';
import { 
  Container,
  Body,  
  TitleAreaPage,
  TitlePage,
  ToolsArea,
  ModalView,
  ModalContent,
  ModalTitle,
  ModalResume
} from './styles';
//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigationState } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const ElectronicCall = () => {

  const { loading, setLoading } = useContext(LoadingContext);

  const navigation = useNavigation();  

  const { userData } = useSelector((state) => state.me);

  const [ primaryColor, setPrimaryColor ] = useState('#fff');
  const [ company, setCompany ] = useState(null);
  
  useEffect(()=>{
    if(userData){
      if(userData.companys_joined.length){
        setPrimaryColor(userData.companys_joined[0].primary_color);
        setCompany(userData.companys_joined[0].company_id_annotated);
      }

    }

  }, [userData]);  

  //Register class
  const { success, loadingRegister, error, data, loadingList, loadingChange, loadingRemove } = useSelector((state) => state.class);
  
  const dispatch = useDispatch();

  const [ showModal, setShowModal ] = useState(false);

  const [ name, setName ] = useState('');

  const [ disabledSubmit, setDisabledSubmit ] = useState(true);

  const handleSubmit = () => {
    const data = {
      company,
      name
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

  //Listar
  useEffect(() => {
    if(company){
      dispatch(list(company));
    }

  }, [dispatch, company]);

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
    if(!loadingChange){ //Fechar o modal quando finalizar o cadastro
      setShowModalChange(false);
    }

  }, [loadingChange]);

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
  
  //Encaminhar parametros dinamicamnete
  useEffect(() => {
    navigation.navigate(currentRouteName, //Renavegar até a página atual
      {
        screen: currentRouteName, params: {
          classes: data,
          color: primaryColor
        }
      }
    );

  }, [data, primaryColor, currentRouteName]); //Quando atualizar o dado vai renavegar pra página que estiver selecionada

  return (
    <>
      {
        loading ? <LoadingPage/> : (
          <Container>
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
            <StatusBar 
              translucent
              backgroundColor="transparent"
            />
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
                    <InputForm label='Nome da turma' value={nameForm} setValue={setNameForm} color={primaryColor}/>
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
            <Body>
              <TitleAreaPage>
                <TitlePage style={{color: primaryColor}}>Turmas</TitlePage>
              </TitleAreaPage>
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
                  iconName={'people-sharp'}
                  action={() => navigation.navigate('ListClass')}
                  title={'Realizar Chamada'}
                />                
                <BoxAction
                  color={currentRouteName == 'EditClass' ? '#f0f2f5': primaryColor}
                  backgroundColor={currentRouteName != 'EditClass' ? '#f0f2f5': primaryColor}
                  iconName={'pencil-sharp'}
                  action={() => navigation.navigate('EditClass')}
                  title={'Adicionar Turma'}
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
                    classes: data,
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
                    classes: data,
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
                    classes: data,
                    color: primaryColor,
                    actionItem: handleRemoveClass            
                  }}
                  options={{
                    classes: data,
                    headerShown: false,
                  }}                  
                />                                
              </Stack.Navigator>
              {/* <ContainerClass>
                {
                  data && data.length > 0 && data.map((item, i) => (
                    <ClassCard key={item.id} onPress={() => navigation.navigate('Call', {classId: item.id, className: item.name})}>
                      <Stick/>
                      <TextArea>
                        <NameClass style={{color: primaryColor}}>{item.name}</NameClass>
                      </TextArea>
                      <IconArea>
                        <Ionicons name='enter-outline' size={28} color={primaryColor}/>
                      </IconArea>
                    </ClassCard>              
                  ))
                }
              </ContainerClass> */}
            </Body>
          </Container>
        )
      }
    </>
  )
};  

export default ElectronicCall;