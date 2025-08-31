import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: 70px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Button = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10px;
    padding: 5px;
    max-width: 115px;
    min-height: 45px;
    background: #f0f2f5;
    border-radius: 50px;
    gap: 0px;
`;

export const ButtonExit = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10px;
    padding: 5px;
    max-width: 115px;
    min-height: 45px;
    background: #f0f2f5;
    border-radius: 50px;
    gap: 5px;
`;

export const Text = styled.Text`
    color: #65747d;
    font-size: 16px;
    font-family: 'montserrat-semibold';
`;

export const ExportTouch = styled.TouchableOpacity`
    width: 45px;
    height: 45px;
    background: #000;
`;