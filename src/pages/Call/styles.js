import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';

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

export const ToolsArea = styled.ScrollView.attrs({
    horizontal: true, // Torna o ScrollView horizontal
    contentContainerStyle: {
      flexDirection: "row",
      gap: 10, // Controla o espaço entre os elementos
    },
  })`
    max-height: 80px; 
    flex: 1;
    overflow: visible;
`;
  
export const ButtonAction = styled(TouchableOpacity).attrs(() => ({
    activeOpacity: 0.7, // Define uma opacidade para o efeito de toque
    gap: 10
  }))`
    width: 78px;
    height: 78px;
    justify-content: center;
    align-items: center;
    background-color: #f2f2f2;
    border-width: 1px;
    border-color: ${({ borderColor }) => borderColor || "#000"};
    border-radius: 8px;
  
    /* Sombras no iOS */
    shadow-color: #000;
    shadow-offset: 0px 4px; /* Mude a altura para ajustar */
    shadow-opacity: 0.3; /* Ajuste a intensidade */
    shadow-radius: 4px; /* Controle do espalhamento */
  
    /* Sombras no Android */
    elevation: 6; /* Ajuste o valor para intensidade */
`;

export const ButtonActionTitle = styled.Text`
    font-size: 10px;
    font-family: 'montserrat-medium';
    text-align: center;
    line-height: 10px;
    margin-top: 5px;
    max-width: 50px;
`;

export const ModalView = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;

export const ModalContent = styled(View).attrs({
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,    
})`
    width: 350px;
    border-radius: 20px;
    align-items: start;
    justify-content: center;
    padding: 20px; 
    background: #fff; 
`;

export const ModalTitle = styled.Text`
    margin-top: 16px;
    font-size: 18px;
    font-family: 'montserrat-bold';  
`;

export const ModalResume = styled.Text`
    margin-top: 5px;
    font-size: 12px;
    font-family: 'montserrat-regular';
    text-align: justify;
    color: #4e4e4e;  
`;

export const InstructionArea = styled.View`
    height: 62px;
    align-items: start;
    justify-content: flex-end;
`;

export const Instruction = styled.Text`
    color: #606060;
    font-size: 16px;
    font-family: 'montserrat-regular';    
`;

export const ContainerStudent = styled.ScrollView`
    width: 100%;
    flex: 1;
    margin-top: 10px;
`;

export const StudentCard = styled.View`
    width: 100%;
    height: 45px;
    margin-bottom: 0;
    position: relative;
    flex: 1;
    flex-direction: row; 
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: #ababab;    
`;

export const StudentNameArea = styled.View`
    align-items: start;
    justify-content: center;
`;

export const StudentName = styled.Text`
    font-size: 14px;
    font-family: 'montserrat-regular';     
`;

export const StudentToolsArea = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    min-width: 35px;
    border-width: 2px;
    border-color: #ccc;
    border-radius: 50px;
    margin: 5px;
`;

export const CallOptions = styled.View`
    margin-top: 20px;
    min-height: 90px;
`;

export const Radio = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;  
`;

export const RadioIcon = styled.View`
    align-items: center;
    justify-content: center;
    min-width: 35px;
    border-width: 2px;
    border-color: #ccc;
    border-radius: 50px;
    margin: 5px;    
`;

export const RadioLabel = styled.View`
    align-items: center;
    justify-content: center;
`;

export const RadioText = styled.Text`
    color: #ccc;
    font-size: 18px;
    font-family: 'montserrat-semibold';  
`;

export const Select = styled.View`
    background-color: #0000000d;
    border-radius: 20px;
    height: 55px;
    margin-top: 10px;
`;