import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
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
import EditProfile from './EditProfile';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
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

  const { loadingLogout } = useSelector((state) => state.auth);
  const { loading, setLoading } = useContext(LoadingContext);

  const { userData } = useSelector((state) => state.me);
  const [ primaryColor, setPrimaryColor ] = useState('#fff');
  const [ photoPerfil, setPhotoPerfil ] = useState(null);
  const [ namePerfil, setNamePerfil ] = useState('');

  useEffect(()=>{
    if(userData){
      setNamePerfil(userData.full_name);
      setPhotoPerfil(`${URL}${userData.profileImage}`);

      if(userData.companys_joined.length){
        setPrimaryColor(userData.companys_joined[0].primary_color);
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

  return (
    <>
      {
        loading ? <LoadingPage/> : (
          <Container style={{backgroundColor: primaryColor}}>
            <StatusBar 
              translucent
              backgroundColor="transparent"
            />
            <PerfilArea>
              <View style={{paddingTop: 20, backgroundColor: '#fff'}}></View>
              <Profile>
                <Header themeColor={primaryColor} handleLogout={handleLogout}/>
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
                  <ProfileNameSubtitle>Colaborador</ProfileNameSubtitle>
                </PerfilContent>
              </Profile>
            </PerfilArea>
            <Body>
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
              </ToolsArea>
              <Stack.Navigator>
                <Stack.Screen
                  name='EditProfile'
                  component={EditProfile}
                  initialParams={{
                    color: primaryColor
                  }}
                  options={{
                    headerShown: false
                  }}
                />                
                <Stack.Screen
                  name='ChangePassword'
                  component={ChangePassword}
                  initialParams={{
                    color: primaryColor
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

export default Perfil;