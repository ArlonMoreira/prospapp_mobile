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
    justify-content: space-around;
    align-items: center;
    margin: 10px;
    padding: 5px;
    max-width: 115px;
`;

export const Text = styled.Text`
    color: #fff;
    font-size: 20px;
    font-family: 'montserrat-bold';
    margin-top: 2px;
`;

export const ExportTouch = styled.TouchableOpacity`
    width: 45px;
    height: 45px;
    background: #000;
    margin-right: 10px;
`;