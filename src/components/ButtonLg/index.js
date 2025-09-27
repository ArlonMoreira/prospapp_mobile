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

const ButtonLg = ({title, action, loading=false, disabled=false, color='#fff', fontColor='#16443E', largeWidth=292, icon, iconSize=22, iconColor='#fff', borderColor='transparent', fontFamily='montserrat-black'}) => {
  
  const [styles, setStyles] = useState({ backgroundColor: color, width: largeWidth, opacity: 1 });

  useEffect(() => {
    if (disabled) {
      setStyles({ backgroundColor: color == 'transparent'? color: '#cecece', width: largeWidth, opacity: 1, borderWidth: 1, borderColor: borderColor });
    } else {
      setStyles({ backgroundColor: color, width: largeWidth, opacity: 1, borderWidth: 1, borderColor: borderColor });
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
              <Text style={{color: fontColor, fontFamily}}>{title}</Text>             
            </TextArea>
          )
        }
      </Content>
    </Container>
  )
}

export default ButtonLg;