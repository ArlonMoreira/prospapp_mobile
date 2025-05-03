import React, { useEffect } from 'react';
//Styles
import { 
  Container,
  InstructionArea,
  Instruction,
  ScrollArea
} from '../../../ElectronicCall/ListClass/styles';

const EditLocals = ({ route }) => {

  const { data } = route.params;

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Container>
      <InstructionArea>
        <Instruction>Alterar as informações dos locais de registro de ponto.</Instruction>
      </InstructionArea>            
      <ScrollArea>
      {

      }
      </ScrollArea>
    </Container>
  )
};

export default EditLocals