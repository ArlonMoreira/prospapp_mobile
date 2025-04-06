import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';

export const Container = styled.View`
    flex: 1;
    padding-top: 20px;
    background: #fff;
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

export const ToolsArea = styled.ScrollView.attrs({
    horizontal: true, // Torna o ScrollView horizontal
    contentContainerStyle: {
      flexDirection: "row",
      gap: 10, // Controla o espaço entre os elementos
    },
  })`
    max-height: 90px; 
    flex: 1;
    overflow: visible;
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

export const DateArea = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center; 
    flex-direction: row;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
`;

export const IconAreaDate = styled(TouchableOpacity).attrs({
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4 
})`
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;   
    elevation: 6;
`;

export const TextDateArea = styled.View`
    width: 82%;
    height: 42px;
    border: 1px;
    border-radius: 20px;
    align-items: start;
    justify-content: center;
    padding-left: 20px;    
`;

export const InfoName = styled.Text`
    color: #8f8f8f;
    font-size: 13px;
    font-family: 'montserrat-regular';
`;