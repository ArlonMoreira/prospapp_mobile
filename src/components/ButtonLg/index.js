import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
//Styles
import { 
    Container,
    Text,
    Content,
    TextArea
} from './styles';
import { FontAwesome } from '@expo/vector-icons';

const ButtonLg = ({title, action, loading=false, disabled=false, color='#fff', fontColor='#16443E', largeWidth=292, icon, iconSize=22, iconColor='#fff'}) => {
  
  const [styles, setStyles] = useState({ backgroundColor: color, width: largeWidth, opacity: 1 });

  useEffect(() => {
    if (disabled) {
      setStyles({ backgroundColor: '#cecece', width: largeWidth, opacity: 1 });
    } else {
      setStyles({ backgroundColor: color, width: largeWidth, opacity: 1 });
    }
  }, [disabled, color, largeWidth]);

  return (
    <Container onPress={() => action()} disabled={disabled} style={styles}>
      <Content>
        {
          loading ? (
            <ActivityIndicator size="small" color={fontColor}/>
          ): (
            <TextArea>
              {
                icon && <FontAwesome name={icon} size={iconSize} color={iconColor} />
              }
              <Text style={{color: fontColor}}>{title}</Text>             
            </TextArea>
          )
        }
      </Content>
    </Container>
  )
}

export default ButtonLg;