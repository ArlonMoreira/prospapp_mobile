import styled from 'styled-components/native';
import { Image } from 'react-native';

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 100px;
    background: #fff;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 20px;
`;

export const Logo = styled(Image).attrs({
    resizeMode: 'contain'    
})`
    width: 65px;
    height: 65px;
`;

export const PerfilArea = styled.View`
    flex-direction: row;
`;

export const PerfilLabel = styled.View`
    flex-direction: column;
    gap: 0px;
`

export const NameArea = styled.Text`
    font-size: 16px;
    font-family: 'montserrat-semibold'; 
`;

export const LoadArea = styled.Text`
    font-size: 12px;
    font-family: 'montserrat-medium';
    color: '#cecece'; 
    margin-top: -4px;
`;

export const PhotoContainer = styled.View`
    width: 50px;
    height: 50px;
    background: #cecece;
    border-radius: 50px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
`;

export const Photo = styled(Image).attrs({
    resizeMode: 'cover'    
})`
    width: 100%;
    height: 100%;
`;