import React from 'react';
import { ActivityIndicator } from 'react-native';
//Styles
import { 
    Container,
    Text,
    Content
} from './styles';

const ButtonLg = ({title, action, loading=false, disabled=false, color='#fff', fontColor='#16443E', largeWidth='292px'}) => {
  return (
    <Container onPress={() => action()} disabled={disabled} style={{backgroundColor: color, width: largeWidth}}>
      <Content>
        {
          loading ? (
            <ActivityIndicator size="small" color={fontColor}/>
          ): (
            <Text style={{color: fontColor}}>{title}</Text>            
          )
        }
      </Content>
    </Container>
  )
}

export default ButtonLg;