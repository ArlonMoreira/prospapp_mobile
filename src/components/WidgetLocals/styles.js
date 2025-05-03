import styled from 'styled-components/native';
import { Image } from 'react-native';

export const Container = styled.TouchableOpacity`
    width: 100%;
    margin-bottom: 20px;
    border-radius: 10px;
    border-color: transparent;
    background: #f0f2f5bf;
    padding: 10px;
    flex-direction: row;
    justify-content: space-between; 
    height: 90px;
`;

export const LabelsArea = styled.View`
    margin-left: 10px;
`;


export const Label = styled.Text`
    color: #000;
    font-size: 14px;
    fontFamily: 'montserrat-medium';
`;

export const InfoArea = styled.View`
    flex-direction: row;
    margin-top: 14px;
    gap: 10px;
`;

export const Info = styled.View`
    background: #fff;
    padding-inline: 10px;
    border-radius: 20px;
`;

export const IconArea = styled.View`
    width: 45px;
    height: 100%;
    align-items: center;
    justify-content: center;    
`;