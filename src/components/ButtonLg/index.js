import React from 'react';
import { ActivityIndicator } from 'react-native';
//Styles
import { 
    Container,
    Text,
    Content
} from './styles';

const ButtonLg = ({title, action, loading=false}) => {
  return (
    <Container onPress={() => action()}>
      <Content>
        {
          loading ? (
            <ActivityIndicator size="small" color="#16443E"/>
          ): (
            <Text>{title}</Text>            
          )
        }
      </Content>
    </Container>
  )
}

export default ButtonLg;