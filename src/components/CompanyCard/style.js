import styled from 'styled-components/native';
import { View, Image } from 'react-native';

export const Container = styled(View).attrs({
    shadowColor: "#939393",
    shadowOffset:{
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.87,
    shadowRadius: 4.65,
    elevation: 8,
})`
    height: 125px;
    border-radius: 16px;
    background-color: #fff;
    margin-left: 20px;
    margin-right: 20px;  
    margin-top: 16px;  
    margin-bottom: 12px;
    flex: 1;
    flex-direction: row;
    overflow: hidden;
    padding: 10px;
`;

export const LogoArea = styled.View`
    width: 30%;
    background: #f7f7f7;
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
    color: #a3a3a3;
    font-size: 14px;
    font-family: 'montserrat-regular';
`