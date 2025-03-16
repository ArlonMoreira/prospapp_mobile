import React, { useState, useEffect } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
//Hooks
import { useContext } from 'react';
import { useNavigationState } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
//Context
import { LoadingContext } from '../../contexts/LoadingContext';
//Components
import Header from '../../components/Header';
import LoadingPage from '../../components/LoadingPage';
//Pages
import ChangePassword from './ChangePassword';
import ManagerProfile from './ManagerProfile';
import EditProfile from './EditProfile';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { reset, resetForm } from '../../slices/resetPasswordSlice';
import { change } from '../../slices/meSlice';
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
  TabButtonLabel
} from './styles';
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

  return (
    <>
      {
        loading ? <LoadingPage/> : (
          <Container>
            <StatusBar 
              translucent
              backgroundColor="transparent"
            />          
            <Header themeColor={primaryColor} handleLogout={handleLogout}/>
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
                          companyId
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
      }
    </>
  )
};

export default Perfil;