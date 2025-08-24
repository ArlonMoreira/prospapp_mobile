import { useMemo } from 'react'
import useUtil from '../../../hooks/useUtil';
//Components
import Widget from '../../../components/Widget';
import InstructionArea from '../../../components/IntroductionArea';
//Styles
import { Container, ListArea } from '../ListClass/styles';
import { FlatList } from 'react-native';

const EditClass = ({ route }) => {

  const { classes, color, actionItem } = route.params;
  const { ordenarObjectAsc } = useUtil();

  const classesOrder = useMemo(() => {
    return classes && classes.length > 0 
      ? ordenarObjectAsc([...classes], 'name') 
      : [];
  }, [classes]);

  return (
    <Container>
      <InstructionArea text={'Selecione uma turma para realizar alterações.'}/>
      
      <ListArea>
        <FlatList
          data={classesOrder}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Widget 
              action={() => actionItem(item)} 
              icon='pencil-sharp' 
              iconSize={26} 
              color={color} 
              item={item}
            />
          )}
        />
      </ListArea>
    </Container>
  )
}

export default EditClass;
