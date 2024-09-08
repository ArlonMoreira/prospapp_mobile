import styled from 'styled-components/native';

export const SearchContainer = styled.View`
    height: 55px;
    border: 0;
    border-radius: 16px;
    flex-direction: row;
    background: #0000000d;
    align-items: center;
    justify-content: center;    
`;

export const Search = styled.TextInput`
    height: 100%;
    width: 84%;
    padding: 10px;
    padding-left: 20px;
    color: #008C81;
    font-size: 18px;
    font-family: 'montserrat-semibold';
`;

export const SearchIconArea = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;