import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    zIndex: 1;
`;

export const FadingContainer = styled.View`
    background: #00000099;
    width: 100%;
    height: 100%;
`;