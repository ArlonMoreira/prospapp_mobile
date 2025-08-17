import { useMemo } from 'react'
//Hooks
import { useNavigation } from '@react-navigation/native';
import useUtil from '../../../hooks/useUtil';
//Components
import Widget from '../../../components/Widget';
//Styles
import { Container, ScrollArea, InstructionArea, Instruction } from '../ListClass/styles';

const RelateUser = ({ route }) => {

  const navigation = useNavigation();
  const { classes, color, company, logo } = route.params;
  const { ordenarObjectAsc } = useUtil();

  const classesOrder = useMemo(() => {
    return classes && classes.length > 0? ordenarObjectAsc([...classes], 'name'): [];
  }, [classes]);

  return (
    <Container>
      <InstructionArea>
        <Instruction>Defina quais usuários terão autorização para vincular-se à sua turma.</Instruction>
      </InstructionArea>
      <ScrollArea>
        {
          classesOrder && classesOrder.length > 0 && classesOrder.map((item, i) => (
            <Widget action={() => navigation.navigate('AddUser', { color, data: item, company, logo })} key={i} icon='person-add' iconSize={26} color={color} item={item}/>
          ))
        }
      </ScrollArea>
    </Container>
  )
}

export default RelateUser;