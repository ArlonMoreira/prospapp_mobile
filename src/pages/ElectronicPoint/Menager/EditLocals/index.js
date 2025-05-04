import React, { useEffect } from 'react';
//Components
import WidgetLocals from '../../../../components/WidgetLocals';
//Styles
import { 
  Container,
  InstructionArea,
  Instruction,
  ScrollArea
} from '../../../ElectronicCall/ListClass/styles';

const EditLocals = ({ route }) => {

  const { data, color } = route.params;

  return (
    <Container>
      <InstructionArea>
        <Instruction>Alterar as informações dos locais de registro de ponto.</Instruction>
      </InstructionArea>            
      <ScrollArea>
      {
        data && Array.isArray(data) && data.length > 0 && data.map((item, i) => (
          <WidgetLocals item={item} key={i} color={color} icon={'pencil'} iconSize={22}></WidgetLocals>
        ))
      }
      </ScrollArea>
    </Container>
  )
};

export default EditLocals