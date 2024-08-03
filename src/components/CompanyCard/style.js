import styled from 'styled-components/native';
import { Image, View } from 'react-native';


export const ModalContainer = styled.View`
    flex: 1;
    justify-content: flex-end;
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
    width: 100%;
    height: 250px;
    background: #008C81;
    border-radius: 20px 20px 0px 0px;
    padding: 20px;
    align-items: center;
    justify-content: center;
    gap: 20px;     
`;

export const ModalTitle = styled.Text`
    color: #fff;
    font-size: 20px;
    font-family: 'montserrat-bold'; 
    text-align: center;   
`;

export const ModalMensage = styled.Text`
    color: #fff;
    font-size: 11px;
    font-family: 'montserrat-medium';
    text-align: justify;     
`;

export const Container = styled(View).attrs({
    shadowColor: '#d1d1d1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
})`
    height: 125px;
    border-radius: 16px;
    background-color: #f7f7f7;
    margin-left: 20px;
    margin-right: 20px;  
    margin-top: 16px;  
    margin-bottom: 12px;
    border: 1px solid #ebebeb;
`;

export const Button = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    overflow: hidden;
    padding: 10px;
    height: 100%; 
`;

export const LogoArea = styled.View`
    width: 30%;
    background: #fff;
    border-radius: 10px;
    flex: 1;
    align-items: center;
    justify-content: center;    
`;

export const InfoArea = styled.View`
    width: 70%;
    padding-left: 20px;
`;

export const Logo = styled(Image).attrs({
    resizeMode: 'contain'    
})`
    width: 75px;
    height: 75px;
`;

export const Title = styled.Text`
    color: #008C81;
    font-size: 20px;
    font-family: 'montserrat-bold';
`;

export const SubTitle = styled.Text`
    color: #a7a7a7;
    font-size: 14px;
    font-family: 'montserrat-regular';
`;

export const Status = styled.View`
    background: #f7f7f7;
    border-radius: 5px;
    flex-direction: row;
    align-items: center;
    gap: 3px;
    padding: 3px;
`
export const StatusLabel = styled.Text`
    color: #008C81;
    font-family: 'montserrat-medium';    
`;