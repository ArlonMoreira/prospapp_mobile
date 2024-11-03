import styled from 'styled-components/native';
import { View } from 'react-native';

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

export const InstructionArea = styled.View`
    height: 72px;
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