import { useMemo } from 'react'
//Hooks
import { useNavigation } from '@react-navigation/native';
import useUtil from '../../../hooks/useUtil';
import InstructionArea from '../../../components/IntroductionArea';
//Components
import Widget from '../../../components/Widget';
//Styles
import { Container, ListArea } from '../ListClass/styles';
import { FlatList } from 'react-native';

const RelateUser = ({ route }) => {

  const navigation = useNavigation();
  const { classes, color, company, logo } = route.params;
  const { ordenarObjectAsc } = useUtil();

  const classesOrder = useMemo(() => {
    return classes && classes.length > 0 
      ? ordenarObjectAsc([...classes], 'name') 
      : [];
  }, [classes]);

  return (
    <Container>
      <InstructionArea text={'Defina quais usuários terão autorização para vincular-se à sua turma.'}/>      

      <ListArea>
        <FlatList
          data={classesOrder}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Widget 
              action={() => navigation.navigate('AddUser', { color, data: item, company, logo })} 
              key={item.id}
              icon='person-add' 
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

export default RelateUser;
