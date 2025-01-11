import React from 'react'
//Styles
import { 
  Container,
  ScrollArea,
  ClassCard,
  NameClass,
  InstructionArea,
  Instruction
} from '../ListClass/styles';

import { Ionicons } from '@expo/vector-icons';

import { 
  TextArea,
  IconArea
} from './styles';

const RemoveClass = ({ route }) => {

  const { classes, color, actionItem } = route.params;

  return (
    <Container>
      <InstructionArea>
        <Instruction>Selecione uma turma para remover:</Instruction>
      </InstructionArea>
      <ScrollArea>
        {
          classes && classes.length > 0 && classes.map((item) => (
            <ClassCard key={item.id} onPress={() => actionItem(item)}>
              <TextArea>
                <NameClass style={{color}}>{item.name}</NameClass>
              </TextArea>
              <IconArea>
                <Ionicons name='close-circle-outline' size={32} color={'#cecece'}/>
              </IconArea>              
            </ClassCard>
          ))
        }
      </ScrollArea>       
    </Container>
  )
}

export default RemoveClass;