import React from 'react'
//Hooks
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
//Styles
import { Container, Button, ButtonExit, Text } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { PerfilArea, PerfilLabel, NameArea, RoleArea, RoleText, PhotoContainer, Photo } from '../../pages/Home/styles';

const URL = process.env.EXPO_PUBLIC_API_URL;

const Header = ({ themeColor='#65747d', handleLogout, handlePerfil=true }) => {

  //Navegação
  const navigation = useNavigation();

  const { userData } = useSelector((state) => state.me);
  const [ primaryColor, setPrimaryColor ] = useState('#fff');
  const [ photoPerfil, setPhotoPerfil ] = useState(null);
  const [ namePerfil, setNamePerfil ] = useState('');
  const [ rolePerfil, setRolePerfil ] = useState('');

  useEffect(()=>{
    if(userData){
        if(userData.companys_joined.length){
            setPrimaryColor(userData.companys_joined[0].primary_color);
            setRolePerfil(userData.companys_joined[0].role);
        }

        if(userData.profileImage){
            setPhotoPerfil(`${URL}${userData.profileImage}`);
        }

        if(userData.full_name){
            const full_name = userData.full_name.split(' ');
            full_name.length > 0 ? setNamePerfil(`${full_name.shift()}`) : setNamePerfil('');
        }

    }

  }, [userData]);  
  
  return (
    <Container>
      <Button onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={22} color={ themeColor } />
        <Text style={{ color: themeColor }}>Voltar</Text>
      </Button>
      {
        handleLogout && (
          <ButtonExit onPress={() => handleLogout()}>
            <Ionicons name="exit-outline" size={24} color={ themeColor } />
            <Text style={{ color: themeColor, fontSize: 20, fontFamily: 'montserrat-medium' }}>Sair</Text>
          </ButtonExit> 
        )
      } 
      {
        handlePerfil && (
          <PerfilArea onPress={() => navigation.navigate('Perfil')} style={{marginBottom: 10}}>
              <PhotoContainer>
                  {
                      photoPerfil && <Photo source={{uri: photoPerfil}}/>
                  }
              </PhotoContainer>
          </PerfilArea>          
        )
      }    
    </Container>
  )
}

export default Header;