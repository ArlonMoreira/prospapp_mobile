import React from 'react';
//Styles
import { 
    Container,
    Text,
    Content
} from './styles';

const ButtonLg = ({title, action}) => {
  return (
    <Container onPress={() => action()}>
      <Content>
        <Text>{title}</Text>
      </Content>
    </Container>
  )
}

export default ButtonLg;