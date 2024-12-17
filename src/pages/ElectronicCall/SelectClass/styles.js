import styled from 'styled-components/native';

export const Container = styled.View`
    background: #fff;
    flex: 1;
`;

export const ScrollArea = styled.ScrollView`
    margin-top: 20px;
    width: 100%;
    flex: 1;
`;

export const ClassCard = styled.TouchableOpacity`
    width: 100%;
    height: 65px;
    background: #ededed;
    margin-bottom: 5px;
    position: relative;
    flex: 1;
    flex-direction: row;
`;

export const Stick = styled.View`
    width: 4px;
    height: 100%;
    left: 0;
    background: #ccc;
    position: absolute;
`;

export const TextArea = styled.View`
    width: 80%;
    height: 100%;
    padding: 10px;
    align-items: start;
    justify-content: center;      
`;

export const IconArea = styled.View`
    width: 20%;
    height: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;     
`;

export const NameClass = styled.Text`
    font-size: 18px;
    font-family: 'montserrat-semibold'; 
`;