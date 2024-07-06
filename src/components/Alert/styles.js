import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 75px;
    position: absolute;
    bottom: 0;
    z-index: 5;
    padding: 10px;
`;

export const Toast = styled.View`
    background: #fff3cd;
    width: 100%;
    height: 100%;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    border: 1px solid #664d03;
    padding: 10px;
    opacity: .86;    
`;

export const Text = styled.Text`
    color: #664d03;
    text-align: start;
    font-size: 12px;
    font-family: 'montserrat-medium';
`;

export const CloseButton = styled.TouchableOpacity`
    width:35px;
    height:35px;
    align-items: center;
    justify-content: center;
`