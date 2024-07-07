import styled from 'styled-components/native';

export const Introduction = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const IntroductionText = styled.Text`
    color: #fff;
    font-size: 22px;
    font-family: 'montserrat-bold';
    text-align: start;
    width: 100%;
    padding: 25px;
`;

export const FormArea = styled.View`
    flex: 5;
    gap: 10px;
    margin: 10px;
`;

export const ItemFormArea = styled.View`
    flex: 1;
`;

export const Errors = styled.View`
    margin-left: 10px;
`

export const Error = styled.Text`
    color: #E6D68E;
    font-size: 10px;
    font-family: 'montserrat-regular';
`;

export const SubmitButton = styled.View`
    width: 100%;
    min-height: 85px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`