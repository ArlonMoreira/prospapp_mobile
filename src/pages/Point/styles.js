import styled from 'styled-components/native';
import { Image } from 'react-native';

export const ScrollArea = styled.ScrollView`
    margin-top: 5px;
    padding-inline: 15px;
    width: 100%;
    flex: 1;
`;

export const TitleArea = styled.View`
    height: 80px;
    justify-content: center;      
`;

export const ButtonsArea = styled.View`
    min-height: 80px;
    justify-content: center;
    gap: 10px;
    margin-top: 28px;
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

export const ButtonPoint = styled.TouchableOpacity`
    width: 100%;
    height: 76px;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    border-radius: 5px;
`;

export const Table = styled.View`
    margin-top: 80px;
    flex: 1;
`;

export const HeaderTable = styled.View`
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