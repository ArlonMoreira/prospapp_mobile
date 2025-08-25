import { useMemo } from 'react'
import { View } from 'react-native';
//Hooks
import useUtil from '../../../hooks/useUtil';
//Components
import ButtonLg from '../../../components/ButtonLg';
// import InstructionArea from '../../../components/IntroductionArea';
//Styles
import { Container, ContainerItem, StudentCard, StudentNameArea, StudentName, StudentToolsArea } from './styles';

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const CallRegister = ({ route }) => {

  const { students, color, actionItem, action, disabled } = route.params;
  const { ordenarObjectAsc } = useUtil();

  const studentsOrder = useMemo(() => {
    return students && students.length > 0 ? ordenarObjectAsc([...students], 'name') : [];
  }, [students]);

  return (
    <Container>
      {/* <InstructionArea text={'Selecione o aluno para definir sua presença.'}/> */}
      <ContainerItem
        data={studentsOrder}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: student }) => (
          <StudentCard onPress={() => actionItem(student)} key={student.id}>
            <StudentNameArea>
              <StudentName style={{ color }}>{student.name}</StudentName>
            </StudentNameArea>
            <StudentToolsArea
              style={{
                borderColor: student.present === true
                  ? '#59DE7E'
                  : student.present === false
                    ? '#FF6666'
                    : '#ccc'
              }}
            >
              {student.present === true && <FontAwesome name='check' size={22} color={'#59DE7E'} />}
              {student.present === false && <FontAwesome name='remove' size={22} color={'#FF6666'} />}
              {student.present === null && <FontAwesome5 name='question' size={22} color={'#CCC'} />}
            </StudentToolsArea>
          </StudentCard>
        )}
        ListFooterComponent={
          <View style={{ marginTop: 20 }}>
            <ButtonLg
              disabled={disabled}
              title='Registrar'
              color={color}
              fontColor={'#fff'}
              largeWidth='300px'
              action={action}
            />
          </View>
        }
      />
    </Container>
  )
}

export default CallRegister;
