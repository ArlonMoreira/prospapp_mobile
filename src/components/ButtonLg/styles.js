import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    position: relative;
    height: 55px;
    border-radius: 15px;
`;

export const Content = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Text = styled.Text`
    font-size: 18px;
`;

export const TextArea = styled.View`
    flex-direction: row;
    justify-content: center;  
    align-items: center;      
    gap: 10px;
`;