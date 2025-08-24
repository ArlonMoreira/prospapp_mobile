import { useMemo } from 'react'
import useUtil from '../../../hooks/useUtil';
//Components
import Widget from '../../../components/Widget';
import InstructionArea from '../../../components/IntroductionArea';
//Styles
import { Container, ListArea } from '../ListClass/styles';
import { FlatList } from 'react-native';

const RemoveClass = ({ route }) => {

  const { classes, color, actionItem } = route.params;
  const { ordenarObjectAsc } = useUtil();

  const classesOrder = useMemo(() => {
    return classes && classes.length > 0 
      ? ordenarObjectAsc([...classes], 'name') 
      : [];
  }, [classes]);

  return (
    <Container>
      <InstructionArea text={'Selecione uma turma para remover.'}/>

      <ListArea>
        <FlatList
          data={classesOrder}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Widget 
              action={() => actionItem(item)} 
              key={item.id}
              icon='close-circle-outline' 
              iconSize={32} 
              color={color} 
              item={item}
            />
          )}
        />
      </ListArea>       
    </Container>
  )
}

export default RemoveClass;
