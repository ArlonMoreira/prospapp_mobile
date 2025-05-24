import React, { useEffect } from 'react';
//Components
import WidgetLocals from '../../../components/WidgetLocals';
//Hooks
import { useNavigation } from '@react-navigation/native';
//Styles
import { 
  Container,
  InstructionArea,
  Instruction,
  ScrollArea
} from '../../ElectronicCall/ListClass/styles';

const EditLocals = ({ route }) => {

  const { data, color } = route.params;

  //Navegar para página de login quando autenticado.
  const navigation = useNavigation();  

  return (
    <Container>
      <InstructionArea>
        <Instruction>Alterar as informações dos locais de registro de ponto.</Instruction>
      </InstructionArea>            
      <ScrollArea>
      {
        data && Array.isArray(data) && data.length > 0 && data.map((item, i) => (
          <WidgetLocals item={item} key={i} color={color} icon={'pencil'} iconSize={22} action={() => navigation.navigate('EditLocal', { local: item })}></WidgetLocals>
        ))
      }
      </ScrollArea>
    </Container>
  )
};

export default EditLocals