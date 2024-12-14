import styled from "styled-components/native";
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity).attrs(() => ({
    activeOpacity: 0.7, // Define uma opacidade para o efeito de toque
    gap: 10
  }))`
    width: 78px;
    height: 78px;
    justify-content: center;
    align-items: center;
    background-color: ${({ backgroundColor }) => backgroundColor || "#f0f2f5"};
    border-radius: 8px;
`;

export const Title = styled.Text`
    font-size: 10px;
    font-family: 'montserrat-medium';
    text-align: center;
    line-height: 10px;
    margin-top: 5px;
    max-width: 50px;
`;

/*
    border-width: 1px;
    border-color: ${({ borderColor }) => borderColor || "#000"};
    

    shadow-color: #000;
    shadow-offset: 0px 4px;
    shadow-opacity: 0.3; 
    shadow-radius: 4px;
  
    elevation: 6;

*/