import React from 'react'
//Hooks
import { useNavigation } from '@react-navigation/native';
//Styles
import { 
  Container,
  Button,
  ButtonExit,
  Text,
  ExportTouch
} from './styles';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ themeColor='#65747d', handleLogout }) => {

  const navigation = useNavigation();
  
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
    </Container>
  )
}

export default Header;