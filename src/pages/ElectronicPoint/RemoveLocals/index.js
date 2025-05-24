import React, { useEffect } from 'react';
//Components
import WidgetLocals from '../../../components/WidgetLocals';
//Styles
import { 
  Container,
  InstructionArea,
  Instruction,
  ScrollArea
} from '../../ElectronicCall/ListClass/styles';

const RemoveLocals = ({ route }) => {

  const { data, color, actionItem, setShowTools } = route.params;

  //Para evitar de não aparecer o topo quando for navegado para a página atual;
  useEffect(() => {
    setShowTools(true);
  }, [route.params]);     

  return (
    <Container>
      <InstructionArea>
        <Instruction>Remover local de registro de ponto. Porém, tenha cuidado com essa ação.</Instruction>
      </InstructionArea>
      <ScrollArea>
      {
        data && Array.isArray(data) && data.length > 0 && data.map((item, i) => (
          <WidgetLocals item={item} key={i} color={color} icon={'close-circle-outline'} iconSize={30} action={() => actionItem(item)}></WidgetLocals>
        ))
      }
      </ScrollArea>
    </Container>
  )
};

export default RemoveLocals