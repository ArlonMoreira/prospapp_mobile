import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';

export const Container = styled.View`
    background: #fff;
    flex: 1;
`;

export const InstructionArea = styled.View`
    height: 62px;
    align-items: start;
    justify-content: flex-end;
`;

export const Instruction = styled.Text`
    color: #606060;
    font-size: 16px;
    font-family: 'montserrat-regular';    
`;

export const ContainerItem = styled.ScrollView`
    width: 100%;
    margin-top: 10px;
`;

export const StudentCard = styled.TouchableOpacity`
    width: 100%;
    height: 45px;
    margin-bottom: 0;
    position: relative;
    flex: 1;
    flex-direction: row; 
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: #f0f2f5;    
`;

export const StudentNameArea = styled.View`
    align-items: start;
    justify-content: center;
`;

export const StudentName = styled.Text`
    font-size: 14px;
    font-family: 'montserrat-regular';     
`;

export const StudentToolsArea = styled.View`
    align-items: center;
    justify-content: center;
    min-width: 35px;
    border-width: 2px;
    border-color: #ccc;
    border-radius: 50px;
    margin: 5px;
`;