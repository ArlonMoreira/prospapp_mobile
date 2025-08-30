import styled from 'styled-components/native';
import { View } from 'react-native';

export const Container = styled.View`
    flex: 1;
    background: #fff;
`;

export const PageArea = styled.View`
    padding-inline: 15px;
    width: 100%;
    flex: 1;
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
    showsHorizontalScrollIndicator: false, // Oculta a barra de rolagem horizontal
    contentContainerStyle: {
      flexDirection: "row",
      gap: 10, // Controla o espaço entre os elementos
    },
  })`
    margin-top: 20px;
    max-height: 90px; 
    flex: 1;
    overflow: visible;
`;

export const ButtonAction = styled.TouchableOpacity`
    border-radius: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: center;    
    gap: 5px;
`;

export const ButtonActionTitle = styled.Text`
    font-size: 16px;
    font-family: 'montserrat-semibold';
    text-align: center;    
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