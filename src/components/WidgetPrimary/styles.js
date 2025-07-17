import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    width: 100%;
    margin-bottom: 10px;
    border-radius: 10px;
    border-color: transparent;
    background: #ffffff24;
    padding: 10px;
    flex-direction: row;
    justify-content: space-between; 
    height: 110px;
    margin-bottom: 20px;
`;

export const Label = styled.Text`
    color: #fff;
    font-size: 14px;
    fontFamily: 'montserrat-semibold';
`;

export const LabelsArea = styled.View`
    margin-left: 10px;
    justify-content: center;
    width: 250px;
`;
