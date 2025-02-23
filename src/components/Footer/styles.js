import styled from 'styled-components/native';
import { Image } from 'react-native';

export const Container = styled.View`
    height: 100px;
    align-items: center;
    justify-content: center;
    flex-direction: column;  
    gap: 0;
`;

export const Logo = styled(Image).attrs({
    resizeMode: 'center' 
  })`
    width: 60px;
    height: 40px;
    margin-right: 8px;
`;

export const LogoText = styled.Text`
    color: #fff;
    font-size: 14px;
    font-family: 'montserrat-regular';
`;