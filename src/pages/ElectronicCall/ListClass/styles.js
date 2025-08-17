import styled from 'styled-components/native';

export const Container = styled.View`
    background: #fff;
    flex: 1;
`;

export const InstructionArea = styled.View`
    margin-top: 0px;
    align-items: start;
    justify-content: start;
    padding-top: 10px;
    min-height: 46px;
`;

export const Instruction = styled.Text`
    color: #606060;
    font-size: 12px;
    font-family: 'montserrat-medium';
    text-align: justify; 
`;


export const ScrollArea = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false, // Oculta a barra de rolagem horizontal
})`
    margin-top: 5px;
    width: 100%;
    flex: 1;
`;

export const ClassCard = styled.TouchableOpacity`
    width: 100%;
    height: 65px;
    margin-bottom: 5px;
    position: relative;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;    
    border-bottom-width: 1px;
    border-bottom-color: #f0f2f5;
`;

export const TextArea = styled.View`
    width: 60%;
    height: 100%;
    padding: 10px;
    align-items: start;
    justify-content: center;      
`;

export const IconArea = styled.View`
    width: 40%;
    height: 40px;
    flex-direction: row;
    align-items: center;
    justify-content: center;  
    gap: 5px;
    background: #f0f2f5;
    border-radius: 40px;
`;

export const IconText = styled.Text`
    font-size: 14px;
    font-family: 'montserrat-semibold';    
`

export const NameClass = styled.Text`
    font-size: 18px;
    font-family: 'montserrat-semibold'; 
`;