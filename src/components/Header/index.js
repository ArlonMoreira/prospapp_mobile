import React from 'react'
//Hooks
import { useNavigation } from '@react-navigation/native';
//Styles
import { 
  Container,
  Button,
  Text
} from './styles';
import { FontAwesome } from '@expo/vector-icons';

const Header = ({themeColor='#fff'}) => {

  const navigation = useNavigation();
  
  return (
    <Container>
      <Button onPress={() => navigation.goBack()}>
        <FontAwesome name="angle-left" size={42} color={themeColor} />
        <Text style={{color: themeColor}}>Voltar</Text>
      </Button>
    </Container>
  )
}

export default Header;