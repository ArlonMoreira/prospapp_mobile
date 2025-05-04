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

const ListLocals = ({ route }) => {

  const { data, color } = route.params;
  
  return (
    <Container>
      <InstructionArea>
        <Instruction>Abaixo estão listados todos os locais/empresas para registro de ponto. Escolha um local para registro de ponto.</Instruction>
      </InstructionArea>            
      <ScrollArea>
      {
        data && Array.isArray(data) && data.length > 0 && data.map((item, i) => (
          <WidgetLocals item={item} key={i} color={color}></WidgetLocals>
        ))
      }
      </ScrollArea>
    </Container>
  )
};

export default ListLocals