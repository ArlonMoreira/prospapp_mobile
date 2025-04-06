import styled from 'styled-components/native';
import { Image } from 'react-native';

export const LogoContainer = styled.View`
    justifyContent: center;
    alignItems: center;
    padding: 20px;
    background: #fff;
    border-radius: 48px;
    width: 135px;
    height: 135px;
    margin-bottom: 20px;
`;

export const Logo = styled(Image).attrs({
    resizeMode: 'contain'    
})`
    width: 80px;
    height: 80px;
`;