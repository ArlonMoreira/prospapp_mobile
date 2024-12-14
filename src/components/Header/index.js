import React from 'react'
//Hooks
import { useNavigation } from '@react-navigation/native';
//Styles
import { 
  Container,
  Button,
  Text,
  ExportTouch
} from './styles';
import { Ionicons } from '@expo/vector-icons';

const Header = ({themeColor='#fff', exportAction}) => {

  const navigation = useNavigation();
  
  return (
    <Container>
      <Button onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={22} color={'#65747d'} />
        <Text style={{color: '#65747d'}}>Voltar</Text>
      </Button>
      {
        exportAction && <ExportTouch onPress={() => exportAction()}/>
      }
    </Container>
  )
}

export default Header;