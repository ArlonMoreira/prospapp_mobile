import { useMemo } from 'react'
import useUtil from '../../../hooks/useUtil';
//Components
import Widget from '../../../components/Widget';
//Styles
import { Container, ScrollArea, InstructionArea, Instruction } from '../ListClass/styles';

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
            <Widget action={() => actionItem(item)} key={i} icon='pencil-sharp' iconSize={26} color={color} item={item}/>
          ))
        }
      </ScrollArea>
    </Container>
  )
}

export default EditClass;