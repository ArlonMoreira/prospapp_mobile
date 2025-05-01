import React from 'react';
//Styles
import { 
  Container,
  InstructionArea,
  Instruction,
  ScrollArea
} from '../../../ElectronicCall/ListClass/styles';

const ListLocals = () => {
  return (
    <Container style={{ paddingTop: 20 }}>
      <InstructionArea>
        <Instruction>Abaixo, estão listados todos os locais/empresas para registro de ponto. Escolha um local para registro de ponto.</Instruction>
      </InstructionArea>            
      <ScrollArea>
      {

      }
      </ScrollArea>
    </Container>
  )
};

export default ListLocals