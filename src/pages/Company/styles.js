import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background: #fff;
`;

export const Header = styled.View`
    margin-top: 30px;
    max-height: 35px;
    flex: 1;
    align-items: start;
    justify-content: center;    
`

export const Perfil = styled.View`
    flex: 1;
    flex-direction: row;
`

export const PerfilContainer = styled.View`
    width: 50%;
    padding: 20px;
`;

export const NamePerfil = styled.Text`
    color: #fff;
    font-size: 24px;
    font-family: 'montserrat-bold';
`

export const WelcomeMensage = styled.Text`
    color: #fff;
    font-family: 'montserrat-medium';
`

export const PhotoContainer = styled.View`
    flex: 1;
    background: #f1f1f1;
    border-radius: 20px;
`;

export const Main = styled.View`
    flex: 1;
    padding-right: 20px;
    padding-left: 20px;
`;

export const CompanyTitleContainer = styled.View`
    height: 126px;
    align-items: start;
    justify-content: center;
`;

export const CompanyTitle = styled.Text`
    color: #008C81;
    font-size: 24px;
    font-family: 'montserrat-bold';
`;

export const SearchContainer = styled.View`
    height: 55px;
    border: 1px solid #008C81;
    border-radius: 16px;
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
    width: 16%;
    height: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

