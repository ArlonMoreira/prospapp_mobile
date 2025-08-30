//Hooks
import { useMemo } from 'react';
import useUtil from '../../../hooks/useUtil';
import { FlatList } from 'react-native';
//Components
import WidgetLocals from '../../../components/WidgetLocals';
import InstructionArea from '../../../components/IntroductionArea';
//Styles
import { Container, ListArea } from '../../ElectronicCall/ListClass/styles';

const RemoveLocals = ({ route }) => {

  const { ordenarObjectAsc } = useUtil();

  const { data, color, actionItem } = route.params;
  
  const dataOrder = useMemo(() => {
      return data && data.length > 0 
          ? ordenarObjectAsc([...data], 'name') 
          : [];
  }, [data]);  

  return (
    <Container>
      <InstructionArea text={'Remover local de registro de ponto. Porém, tenha cuidado com essa ação.'}/>
      <ListArea>
        <FlatList
          data={ dataOrder }
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <WidgetLocals item={item} key={item.id} color={color} icon={'close-circle-outline'} iconSize={30} action={() => actionItem(item)}></WidgetLocals>
          )}
        />
      </ListArea>
    </Container>
  )
};

export default RemoveLocals