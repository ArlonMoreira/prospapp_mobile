import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
//Hooks
import { useContext } from 'react';
//Context
import { LoadingContext } from '../../contexts/LoadingContext';
//Components
import Header from '../../components/Header';
import LoadingPage from '../../components/LoadingPage';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
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
  ProfileNameSubtitle
} from './styles';
//Icons
import { Ionicons } from '@expo/vector-icons';

const URL = process.env.EXPO_PUBLIC_API_URL;

const Perfil = () => {

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
              
            </Body>
          </Container>
        )
      }
    </>
  )
};

export default Perfil;