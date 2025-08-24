//Hooks
import { useNavigation } from '@react-navigation/native';
//Components
import WidgetLocals from '../../../components/WidgetLocals';
//Styles
import { 
  Container
} from '../../ElectronicCall/ListClass/styles';

const ListLocals = ({ route }) => {

  const { data, color, logo } = route.params;
  const navigation = useNavigation();

  return (
    <Container>
      {/* <InstructionArea>
        <Instruction>Abaixo estão listados todos os locais/empresas para registro de ponto. Escolha um local para registro de ponto.</Instruction>
      </InstructionArea>                 */}
      {/* <ScrollArea>     
      {
        data && Array.isArray(data) && data.length > 0 && data.map((item, i) => (
          <WidgetLocals item={item} key={i} color={color} action={() => navigation.navigate('Point', { color, data: item, logo })}></WidgetLocals>
        ))
      }
      </ScrollArea> */}
    </Container>
  )
};

export default ListLocals