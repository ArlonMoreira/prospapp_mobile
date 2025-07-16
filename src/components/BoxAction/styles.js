import styled from "styled-components/native";
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity).attrs(() => ({
    activeOpacity: 0.7, // Define uma opacidade para o efeito de toque
    gap: 12
  }))`
    width: 86px;
    height: 86px;
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
    max-width: 55px;
`;