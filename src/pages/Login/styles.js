import styled from 'styled-components/native';
import { Image } from 'react-native';

export const LogoArea = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
`;

export const Logo = styled(Image).attrs({
    resizeMode: 'contain'  
  })`
    margin: 0;
    padding: 0;
    width: 120px;
    height: 100px;
    margin-right: 5px;
`;

export const LogoTitle = styled.Text`
    color: #ffffff;
    font-size: 20px;
    font-weight: bolder;
    width: 60%;
    text-align: center;
    fontFamily: 'montserrat-semibold';
`;

export const Container = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;