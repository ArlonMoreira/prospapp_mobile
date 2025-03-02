import React, { useMemo } from 'react'
import useUtil from '../../../hooks/useUtil';
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

const EditClass = ({ route }) => {

  const { classes, color, actionItem } = route.params;
  const { ordenarObjectAsc } = useUtil();

  const classesOrder = useMemo(() => {
    return classes && classes.length > 0? ordenarObjectAsc([...classes], 'name'): [];
  }, [classes]);

  return (
    <Container>
      <InstructionArea>
        <Instruction>Selecione uma turma para realizar alterações:</Instruction>
      </InstructionArea>
      <ScrollArea>
        {
          classesOrder && classesOrder.length > 0 && classesOrder.map((item, i) => (
            <ClassCard key={item.id} onPress={() => actionItem(item)}>
              <TextArea>
                <NameClass style={{color}}>{item.name}</NameClass>
              </TextArea>   
              <IconArea>
                <Ionicons name='pencil-sharp' size={26} color={'#cecece'}/>
              </IconArea>
            </ClassCard>
          ))
        }
      </ScrollArea>
    </Container>
  )
}

export default EditClass;