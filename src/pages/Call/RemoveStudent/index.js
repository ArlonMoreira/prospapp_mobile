import React, { useMemo } from 'react'
//Hooks
import useUtil from '../../../hooks/useUtil';
//Styles
import { InstructionArea, Instruction } from '../../ElectronicCall/ListClass/styles';
import { Container, ContainerItem, StudentCard, StudentNameArea, StudentName } from '../CallRegister/styles'
import { Ionicons } from '@expo/vector-icons';
import { IconArea } from './styles';

const RemoveStudent = ({ route }) => {

  const { students, color, actionItem } = route.params;
  const { ordenarObjectAsc } = useUtil(); // Evita recriação de `useUtil`

  const studentsOrder = useMemo(() => {
    return students && students.length > 0 ? ordenarObjectAsc([...students], 'name') : [];
  }, [students]);  

  return (
    <Container>
      <InstructionArea style={{height: 50}}>
        <Instruction>Selecione um aluno para remover:</Instruction>
      </InstructionArea>
      <ContainerItem>
        {
          (studentsOrder && studentsOrder.length > 0) && studentsOrder.map((student)=>(
            <StudentCard key={student.id} onPress={() => actionItem(student)}>
              <StudentNameArea>
                <StudentName style={{color}}>{student.name}</StudentName>
              </StudentNameArea>
              <IconArea>
                <Ionicons name='close-circle-outline' size={26} color={'#cecece'}/>
              </IconArea>
            </StudentCard>
          ))
        }
      </ContainerItem>
    </Container>
  )
}

export default RemoveStudent;