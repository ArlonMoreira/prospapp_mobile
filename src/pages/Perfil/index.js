import React, { useState, useEffect } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, Modal, TouchableWithoutFeedback, Text } from 'react-native';
//Hooks
import { useContext } from 'react';
import { useNavigationState } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
//Context
import { LoadingContext } from '../../contexts/LoadingContext';
//Components
import Header from '../../components/Header';
import LoadingPage from '../../components/LoadingPage';
import Fade from '../../components/Fade';
//Pages
import ChangePassword from './ChangePassword';
import ManagerProfile from './ManagerProfile';
import EditProfile from './EditProfile';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { reset, resetForm } from '../../slices/resetPasswordSlice';
import { change } from '../../slices/meSlice';
import { updateUsersManager } from '../../slices/managerSlice';
//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Styles
import { StatusBar } from 'expo-status-bar';
import {  
  Container,
  PerfilArea,
  Profile,
  Body,
  PerfilPhotoContainer,
  PerfilPhoto,
  Photo,
  UploadFileButton,
  PerfilContent,
  ProfileName,
  ProfileNameSubtitle,
  ToolsArea,
  TabButton,
  TabButtonLabel,
  OptionsContainer,
  Option,
  OptionLabel
} from './styles';
import {
  ModalView,
  ModalContent,
  ModalTitle,
  ModalResume
} from '../Call/styles';
//Icons
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const URL = process.env.EXPO_PUBLIC_API_URL;

const Perfil = () => {

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [ showKeyboard, setShowKeyboard ] = useState(false);

  const { loadingLogout } = useSelector((state) => state.auth);
  const { loading, setLoading } = useContext(LoadingContext);

  const { userData } = useSelector((state) => state.me);
  const [ primaryColor, setPrimaryColor ] = useState('#fff');
  const [ photoPerfil, setPhotoPerfil ] = useState(null);
  const [ namePerfil, setNamePerfil ] = useState('');
  const [ rolePerfil, setRolePerfil ] = useState('');
  const [ staffPerfil, setStaffPerfil ] = useState(false);
  const [ companyId, setCompanyId ] = useState(null);

  //Resetar formulário ao entrar na página
  useEffect(() => {
    dispatch(resetForm());
  }, []);

  useEffect(()=>{
    if(userData){
      setNamePerfil(userData.full_name);
      setPhotoPerfil(`${URL}${userData.profileImage}`);

      if(userData.is_staff) setStaffPerfil(true);

      if(userData.companys_joined.length){
        setPrimaryColor(userData.companys_joined[0].primary_color);
        setRolePerfil(userData.companys_joined[0].role);
        setCompanyId(userData.companys_joined[0].company_id_annotated);

        if(userData.companys_joined[0].role == 'Gestor') setStaffPerfil(true);
      }

    }

  }, [userData]);

  //Deslogar
  const handleLogout = () => {
    dispatch(logout());
  };

  //Apresentar página de loading presente no contexto
  useEffect(() => {
    setLoading(loadingLogout);
  }, [loadingLogout]);

  const currentRouteName = useNavigationState((state) => {
    const parentRoute = state.routes[state.index];

    if(parentRoute.state){
      const subRoute = parentRoute.state.routes[parentRoute.state.index];
      return subRoute.name;

    } 

    return parentRoute.name;

  });

  //Assim que abrir a página navegar por padrão na página editar perfil
  useEffect(()=>{
    navigation.navigate('EditProfile',
      {
        screen: 'EditProfile', params: {
          color: primaryColor
        }
      }
    );

    Keyboard.addListener('keyboardDidShow', () => {
      setShowKeyboard(true);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      setShowKeyboard(false);
    });    
    
  }, []);
  
  //Encaminhar parametros dinamicamnete
  useEffect(() => {
    navigation.navigate(currentRouteName, //Renavegar até a página atual
      {
        screen: currentRouteName, params: {
          color: primaryColor
        }
      }
    );  

  }, [primaryColor, currentRouteName]); //Quando atualizar o dado vai renavegar pra página que estiver selecionada
  
  const handleSubmitEdit = (data) => {
    dispatch(change(data));
  };

  const handleChangePassword = (data) => {
    dispatch(reset(data));
  };

  const { loading: loadingManager } = useSelector((state) => state.manager);

  //Realizar gestão do perfil do usuário
  const [ showModal, setShowModal ] = useState(false);
  const [ userManagerName, setUserManagerName ] = useState('');
  const [ roleSelected, setRoleSelected ] = useState('');
  const [ isPending, setIsPending ] = useState(false);
  const [ isPendingValue, setIsPendingValue ] = useState('');
  const [ isJoinedValue, setIsJoinedValue ] = useState('');
  const [ userId, setUserId ] = useState(null);

  const menagerUser = (user) => {
    setShowModal(true);
    setUserManagerName(user.full_name);
    setRoleSelected(user.role);
    setIsPendingValue('');
    user.is_pending ? setIsPendingValue('Sim'): setIsPendingValue('Não');
    setIsPending(user.is_pending);
    user.is_joined ? setIsJoinedValue('Vinculada'): setIsJoinedValue('Desvinculada');
    setUserId(user.user_id);
  };

  const handleRoleChange = (role) => {
    setRoleSelected(role);
    dispatch(updateUsersManager({ companyId, userId, data: { role } }));
  };
  
  const handlePendingChange = (accept) => {
    setIsPendingValue(accept);
    
    const isAccepted = accept === 'Sim';
    const params = {
      companyId,
      userId,
      data: {
        is_pending: false,
        is_joined: isAccepted,
      },
    };
    
    dispatch(updateUsersManager(params));
    setIsPending(false);
  };
  
  const handleJoinedChange = (joined) => {
    setIsJoinedValue(joined);
    
    const isJoined = joined === 'Vinculada';
    const params = {
      companyId,
      userId,
      data: {
        is_pending: false,
        is_joined: isJoined,
      },
    };
    
    dispatch(updateUsersManager(params));
  };

  return (
    <Container>
      <StatusBar 
        translucent
        backgroundColor="transparent"
      />          
      <Header themeColor={primaryColor} handleLogout={handleLogout}/>
      {
        showModal && <Fade/>
      }
      <Modal
        transparent={true}
        animationType='slide'
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <ModalView>
            <ModalContent>
              <ModalTitle style={{color: primaryColor}}>Alterar dados do usuário</ModalTitle>
              <ModalResume>Abaixo você pode alterar o acesso e permissões de {userManagerName}.</ModalResume>
              {
                !isPending && (
                  <>
                    <Text
                      style={
                        { 
                          marginTop: 20,
                          fontFamily: 'montserrat-medium',
                          color: primaryColor,
                          fontSize: 12
                        }
                      }
                    >
                      Situação de acesso:
                    </Text>
                    <OptionsContainer>
                      {
                        ['Vinculada', 'Desvinculada'].map((joined) => (
                          <Option
                            onPress={() => handleJoinedChange(joined)}
                            style={{ 
                              backgroundColor: isJoinedValue == joined ? loadingManager ? '#d9d9d9': primaryColor: '#fff',
                              borderColor: loadingManager ? '#d9d9d9': primaryColor
                            }}
                          >
                            <OptionLabel
                              style={
                                { 
                                  color: isJoinedValue == joined ? '#fff': loadingManager ? '#d9d9d9': primaryColor
                                }
                              }
                            >{ joined }</OptionLabel>
                          </Option>
                        ))
                      }
                    </OptionsContainer>                          
                  </>                          
                )
              }                      
              {
                isPending && (
                  <>
                    <Text
                      style={
                        { 
                          marginTop: 20,
                          fontFamily: 'montserrat-medium',
                          color: primaryColor,
                          fontSize: 12
                        }
                      }
                    >
                      <Text style={{ fontFamily: 'montserrat-semibold' }}>{userManagerName}</Text> solicitou acesso. Deseja aprovar?
                    </Text>
                    <OptionsContainer>
                      {
                        ['Sim', 'Não'].map((pending) => (
                          <Option
                            onPress={() => handlePendingChange(pending)}
                            style={{ 
                              backgroundColor: isPendingValue == pending ? loadingManager ? '#d9d9d9': primaryColor: '#fff',
                              borderColor: loadingManager ? '#d9d9d9': primaryColor
                            }}
                          >
                            <OptionLabel
                              style={
                                { 
                                  color: isPendingValue == pending ? '#fff': loadingManager ? '#d9d9d9': primaryColor
                                }
                              }
                            >{ pending }</OptionLabel>
                          </Option>
                        ))
                      }
                    </OptionsContainer>                          
                  </>                          
                )
              }
              {
                !isPending && (                    
                  <>
                    <Text
                      style={
                        { 
                          marginTop: 20,
                          fontFamily: 'montserrat-medium',
                          color: primaryColor,
                          fontSize: 12
                        }
                      }
                    >
                      Escolha o perfil do usuário:
                    </Text>
                    <OptionsContainer>
                      {
                        ['Gestor', 'Colaborador'].map((role) => (
                          <Option
                            onPress={() => handleRoleChange(role)}
                            disabled={ loadingManager ? true: false }
                            style={{ 
                              backgroundColor: role == roleSelected ? loadingManager ? '#d9d9d9': primaryColor: '#fff',
                              borderColor: loadingManager ? '#d9d9d9': primaryColor
                            }}
                          >
                            <OptionLabel
                              style={
                                { 
                                  color: role == roleSelected ? '#fff': loadingManager ? '#d9d9d9': primaryColor
                                }
                              }
                            >{ role }</OptionLabel>
                          </Option>
                        ))
                      }
                    </OptionsContainer>                        
                  </>  
                )
              }                                      
            </ModalContent>
          </ModalView>
        </TouchableWithoutFeedback>
      </Modal>
      <PerfilArea style={{pointerEvents: 'box-none', backgroundColor:primaryColor }}>
        <Profile>
          <PerfilContent>
            <PerfilPhotoContainer>
              <PerfilPhoto>
                {
                  photoPerfil && <Photo source={{ uri: photoPerfil }}></Photo>
                }
              </PerfilPhoto>
              <UploadFileButton style={{backgroundColor:primaryColor}}>
                <Ionicons name='camera' size={32} color={'#fff'}/>
              </UploadFileButton>                                          
            </PerfilPhotoContainer>
            <ProfileName style={{ color:primaryColor }}>{ namePerfil }</ProfileName>
            <ProfileNameSubtitle>{rolePerfil}</ProfileNameSubtitle>                         
          </PerfilContent>           
        </Profile>                    
      </PerfilArea>
      <KeyboardAvoidingView
        style={{flex: 1, alignItems: 'flex-start' }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >                                       
        <Body style={{backgroundColor: primaryColor}}>
          {
            !showKeyboard && (
              <ToolsArea>
                <TabButton
                  style={{
                    backgroundColor: currentRouteName === 'EditProfile' ? '#fff': 'transparent',
                  }}
                  onPress={() => navigation.navigate('EditProfile')}
                >
                  <TabButtonLabel
                    style={{
                      color: currentRouteName === 'EditProfile' ? primaryColor: '#fff'
                    }}                  
                  >Editar Perfil</TabButtonLabel>
                </TabButton>
                <TabButton
                  style={{
                    backgroundColor: currentRouteName === 'ChangePassword' ? '#fff': 'transparent',
                  }}                
                  onPress={() => navigation.navigate('ChangePassword')}
                >
                  <TabButtonLabel
                    style={{
                      color: currentRouteName === 'ChangePassword' ? primaryColor: '#fff'
                    }}                  
                  >Alterar Senha</TabButtonLabel>
                </TabButton>
                {
                  staffPerfil && (
                    <TabButton
                      style={{
                        backgroundColor: currentRouteName === 'ManagerProfile' ? '#fff': 'transparent',
                      }}                
                      onPress={() => navigation.navigate('ManagerProfile')}
                    >
                      <TabButtonLabel
                        style={{
                          color: currentRouteName === 'ManagerProfile' ? primaryColor: '#fff'
                        }}                  
                      >Gerir usuários</TabButtonLabel>
                    </TabButton>
                  )
                }                      
              </ToolsArea>                    
            )
          }                
          <Stack.Navigator>
            <Stack.Screen
              name='EditProfile'
              component={EditProfile}
              initialParams={{
                color: primaryColor,
                handleSubmit: handleSubmitEdit
              }}
              options={{
                headerShown: false
              }}
            />                
            <Stack.Screen
              name='ChangePassword'
              component={ChangePassword}
              initialParams={{
                color: primaryColor,
                handleChangePassword: handleChangePassword
              }}                  
              options={{
                headerShown: false
              }}                  
            />
            {
              staffPerfil && (
                <Stack.Screen
                  name='ManagerProfile'
                  component={ManagerProfile}
                  initialParams={{
                    color: primaryColor,
                    companyId,
                    action: menagerUser
                  }}                  
                  options={{
                    headerShown: false
                  }}                  
                />                         
              )
            }             
          </Stack.Navigator>                               
        </Body>
      </KeyboardAvoidingView>          
    </Container>
  )
};

export default Perfil;