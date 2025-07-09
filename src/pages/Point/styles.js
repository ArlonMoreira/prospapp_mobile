import styled from 'styled-components/native';
import { Image } from 'react-native';

export const PageArea = styled.View`
    padding-inline: 15px;
    width: 100%;
    flex: 1;
`;

export const TitleArea = styled.View`
    height: 80px;
    justify-content: center;    
    flex: 1;  
`;

export const ButtonsArea = styled.View`
    min-height: 80px;
    align-items: center;
    justify-content: center;
    flex: 1;
    flex-direction: row;
`;

export const ButtonsAreaIcon = styled.View`
    width: 45px;
    height: 45px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    align-items: center;
    justify-content: center;    
    left: 20;
`;

export const ButtonsAreaIconJustify = styled.View`
    width: 45px;
    height: 45px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    align-items: center;
    justify-content: center;    
    right: 20;
`;

export const ButtonPoint = styled.TouchableOpacity`
    width: 50%;
    height: 76px;
    align-items: center;
    flex-direction: row;
    border-radius: 50px 0px 0px 50px;
    background: #ccc;
    padding-left: 80px;
`;

export const ButtonJustify = styled.TouchableOpacity`
    width: 50%;
    height: 76px;
    align-items: center;
    flex-direction: row;
    border-radius: 0px 50px 50px 0px;
    background: #ccc;
    padding-left: 20px;
`;

export const Table = styled.View`
    flex: 3;
`;

export const HeaderTable = styled.View`
    margin-top: 16;
    flex-direction: row;
    padding-vertical: 8px;
    border-bottom-width: 1px;
    border-bottom-color: #cbd5e1; /* cinza claro */
`;

export const Cell = styled.Text`
    flex: 1;
    text-align: center;
    color: #334155;
`;

export const Row = styled.View`
    flex-direction: row;
    padding-vertical: 8px;
    border-bottom-width: 1px;
    border-bottom-color: #e2e8f0;
    border-radius: 6px;
    margin-vertical: 2px;
    align-items: center;
    justify-content: center;      
`;

export const DeleteButton = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;   
`;