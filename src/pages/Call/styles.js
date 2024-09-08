import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding-top: 20px;
`;

export const Body = styled.View`
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;
`;

export const TitleAreaPage = styled.View`
    height: 45px;
    width: 100%;
    align-items: start;
    justify-content: center;    
`;

export const TitlePage = styled.Text`
    text-align: start;
    font-size: 22px;
    font-family: 'montserrat-bold';
`;

export const InfoArea = styled.View`
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 20px;
    gap: 5px;
`;

export const InfoText = styled.View`
    align-items: center;
    justify-content: start; 
    flex-direction: row;
    gap: 5px;
`;

export const InfoName = styled.Text`
    color: #606060;
    font-size: 18px;
    font-family: 'montserrat-regular';
`;

export const Edit = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    margin-left: 15px;      
`;