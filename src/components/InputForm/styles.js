import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';

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
    opacity: .8
`;

export const InputMask = styled(TextInputMask).attrs({})`
    height: 100%;
    padding: 5px;
    border-bottom-width: 1px;
    font-size: 18px;
    opacity: .8
`;

export const Stick = styled.View`
    position: absolute;
    left: 7px;
    bottom: 8px;
    height: 10px;
    width: 2px;
    border: 0;
`;

export const ShowPassword = styled.TouchableOpacity`
    position: absolute;
    right: 16px;
    bottom: 16px;
`;

