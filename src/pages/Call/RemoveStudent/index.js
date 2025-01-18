import React from 'react'
//Styles
import {
  Container,
  InstructionArea,
  Instruction,
  ContainerItem,
  StudentCard,
  StudentNameArea,
  StudentName
} from '../CallRegister/styles'

import { Ionicons } from '@expo/vector-icons';

import { IconArea } from './styles';

const RemoveStudent = ({ route }) => {

  const { students, color, actionItem } = route.params;

  return (
    <Container>
      <InstructionArea>
        <Instruction>Selecione um aluno para remover:</Instruction>
      </InstructionArea>
      <ContainerItem>
        {
          (students && students.length > 0) && students.map((student)=>(
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