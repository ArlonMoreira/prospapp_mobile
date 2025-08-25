import { useMemo } from 'react'
//Components
// import InstructionArea from '../../../components/IntroductionArea';
//Hooks
import useUtil from '../../../hooks/useUtil';
//Styles
import { Container, ContainerItem, StudentCard, StudentNameArea, StudentName } from '../CallRegister/styles';
import { Ionicons } from '@expo/vector-icons';
import { IconArea } from './styles';

const EditStudent = ({ route }) => {

  const { students, color, actionItem } = route.params;
  const { ordenarObjectAsc } = useUtil();

  const studentsOrder = useMemo(() => {
    return students && students.length > 0 ? ordenarObjectAsc([...students], 'name') : [];
  }, [students]);

  return (
    <Container>
      {/* <InstructionArea text={'Selecione o aluno para edição.'}/>       */}
      <ContainerItem
        data={studentsOrder}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: student }) => (
          <StudentCard key={student.id} onPress={() => actionItem(student)}>
            <StudentNameArea>
              <StudentName style={{ color }}>{student.name}</StudentName>
            </StudentNameArea>
            <IconArea>
              <Ionicons name='pencil-sharp' size={18} color={'#cecece'} />
            </IconArea>
          </StudentCard>
        )}
      />
    </Container>
  )
}

export default EditStudent;
