//Components
import WidgetLocals from '../../../components/WidgetLocals';
import InstructionArea from '../../../components/IntroductionArea';
//Hooks
import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import useUtil from '../../../hooks/useUtil';
import { FlatList } from 'react-native';
//Styles
import { Container, ListArea } from '../../ElectronicCall/ListClass/styles';

const EditLocals = ({ route }) => {
  
  const { ordenarObjectAsc } = useUtil();

  //Navegar para página de login quando autenticado.
  const navigation = useNavigation();    

  const { data, color, companyId, searchRef } = route.params;

  const dataOrder = useMemo(() => {
      return data && data.length > 0 
          ? ordenarObjectAsc([...data], 'name') 
          : [];
  }, [data]);

  return (
    <Container>
      <InstructionArea text={'Alterar as informações dos locais de registro de ponto.'}/>
      <ListArea>
        <FlatList
          data={ dataOrder }
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <WidgetLocals item={item} key={item.id} color={color} action={() => navigation.navigate('EditLocalPoint', { local: item, color, companyId, searchRef })}></WidgetLocals>
          )}
        />
      </ListArea>
    </Container>
  )
};

export default EditLocals