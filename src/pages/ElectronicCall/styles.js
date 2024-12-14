import styled from 'styled-components/native';
import { View } from 'react-native';

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
    height: 60px;
    width: 100%;
    align-items: start;
    justify-content: center;    
`;

export const TitlePage = styled.Text`
    color: #adadad;
    text-align: start;
    font-size: 18px;
    font-family: 'montserrat-semibold';
`;

export const ToolsArea = styled.View`
    height: 50px;
    flex-direction: row;
    padding: 2px;
    margin-top: 10px;
    gap: 10px;
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

export const ContainerClass = styled.ScrollView`
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