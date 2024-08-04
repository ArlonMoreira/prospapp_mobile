import styled from 'styled-components/native';

export const Container = styled.View`
    height: 50px;
    align-items: center;
    justify-content: start;
    flex-direction: row;  
    gap: 5px;
`;

export const Logo = styled.Image`
    width: 26px;
    height: 26px;
    margin-left: 18px;
`;

export const LogoText = styled.Text`
    color: #fff;
    font-size: 16px;
    font-family: 'montserrat-bold';
`;