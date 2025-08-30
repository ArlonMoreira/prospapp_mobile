import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding-top: 20px;
    background: #fff;
`;

export const InstructionArea = styled.View`
    height: 62px;
    align-items: start;
    justify-content: flex-end;
`;

export const Instruction = styled.Text`
    color: #606060;
    font-size: 12px;
    font-family: 'montserrat-medium'; 
    text-align: justify;   
`;

export const SelectContainer = styled.View`
    width: 100%;
    flex-direction: row;
    gap: 2%;
`;

export const LabelSelect = styled.Text`
    fontSize: 10;
    fontFamily: 'montserrat-semibold';
`;

export const MapArea = styled.View`
    padding: 10px;
    border-width: 1px;
    border-color: #ccc;
    border-radius: 10px;
    margin-top: 20px;
`;