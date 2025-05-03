import React, { useEffect } from 'react';
//Styles
import { 
  Container,
  InstructionArea,
  Instruction,
  ScrollArea
} from '../../../ElectronicCall/ListClass/styles';

const RemoveLocals = ({ route }) => {

  const { data } = route.params;

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Container style={{ paddingTop: 10 }}>
      <InstructionArea>
        <Instruction>Remover local de registro de ponto. Porém, tenha cuidado com essa ação.</Instruction>
      </InstructionArea>            
      <ScrollArea>
      {

      }
      </ScrollArea>
    </Container>
  )
};

export default RemoveLocals