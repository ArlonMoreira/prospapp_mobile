//Hooks
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import useUtil from '../../../hooks/useUtil';
import { FlatList } from 'react-native';
//Components
import WidgetLocals from '../../../components/WidgetLocals';
import InstructionArea from '../../../components/IntroductionArea';
//Styles
import { Container, ListArea } from '../../ElectronicCall/ListClass/styles';

const ListLocals = ({ route }) => {
  
  const { ordenarObjectAsc } = useUtil();

  const navigation = useNavigation();

  const { data, color, logo } = route.params;
  
  const dataOrder = useMemo(() => {
      return data && data.length > 0 
          ? ordenarObjectAsc([...data], 'name') 
          : [];
  }, [data]);

  return (
    <Container style={{ paddingTop: 10 }}>
      {/* <InstructionArea text={'Escolha um local/empresa para registro de ponto.'}/> */}
      <ListArea>
        <FlatList
          data={ dataOrder }
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <WidgetLocals item={item} key={item.id} color={color} action={() => navigation.navigate('Point', { color, data: item, logo })}></WidgetLocals>
          )}
        />
      </ListArea>
    </Container>
  )
};

export default ListLocals