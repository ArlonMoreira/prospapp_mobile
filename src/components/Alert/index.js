import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
//Styles
import { 
  Container,
  Text,
  Toast,
  CloseButton
} from './styles'
import { AntDesign } from '@expo/vector-icons'; 

const Alert = ({message, setShow}) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    // Animação de slideIn
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    // Animação de opacidade
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();

  }, [slideAnim]);
  
  return (
    <Container>
      <Animated.View
        style={{
          transform: [{translateX: slideAnim}],
          opacity: opacityAnim
        }}
      >
        <Toast>
          <Text>
            {message}
          </Text>
          <CloseButton onPress={() => setShow(false)}>
            <AntDesign name="close" size={25} color='#664d03'/>
          </CloseButton>        
        </Toast>
      </Animated.View>
    </Container>
  )
}

export default Alert