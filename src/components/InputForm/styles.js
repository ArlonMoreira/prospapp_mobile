import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: 75px;
    padding: 8px;
`;

export const Input = styled.TextInput`
    height: 100%;
    padding: 5px;
    border-bottom-width: 1px;
    font-size: 18px;
`;

export const Stick = styled.View`
    position: absolute;
    left: 7px;
    bottom: 8px;
    height: 10px;
    width: 1px;
    border: 0;
`;

export const ShowPassword = styled.TouchableOpacity`
    position: absolute;
    right: 16px;
    bottom: 16px;
`;

