import styled from 'styled-components/native';
import { Image, View } from 'react-native';

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 100px;
    background: #fff;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 20px;
`;

export const Logo = styled(Image).attrs({
    resizeMode: 'contain'    
})`
    width: 65px;
    height: 65px;
`;

export const PerfilArea = styled.View`
    flex-direction: row;
`;

export const PerfilLabel = styled.View`
    flex-direction: column;
    gap: 0px;
`

export const NameArea = styled.Text`
    font-size: 16px;
    font-family: 'montserrat-semibold'; 
`;

export const LoadArea = styled.Text`
    font-size: 12px;
    font-family: 'montserrat-medium';
    color: '#cecece'; 
    margin-top: -4px;
`;

export const PhotoContainer = styled.View`
    width: 50px;
    height: 50px;
    background: #cecece;
    border-radius: 50px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
`;

export const Photo = styled(Image).attrs({
    resizeMode: 'cover'    
})`
    width: 100%;
    height: 100%;
`;

export const Body = styled.View`
    flex: 1;
    padding: 15px
`;

export const ScrollArea = styled.ScrollView`
    width: 100%;
    height: 100%;
`;

export const TitleArea = styled.View`
    height: 100px;
    justify-content: center;   
`;

export const Title = styled.Text`
    font-size: 22px;
    font-family: 'montserrat-bold';
    font-align: start;
    color: #fff;    
`;

export const ModuleContainer = styled.TouchableOpacity`
    height: 240px;
    width: 100%;
    border-radius: 20px;
    background: #fff;
    overflow: hidden;
    shadow-color: #000;
    elevation: 5;  
    position: relative;
    align-items: center;
    margin-top: 20px; 
`;

export const ImageContent = styled(Image).attrs({
    resizeMode: 'cover'     
})`
    width: 100%;
    height: 100%;
`;

export const TextArea = styled(View).attrs({
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,    
})`
    width: 94%;
    height: 36px;
    margin: 5px;
    border-radius: 50px;
    position: absolute;
    bottom: 5px;  
    background: #fff;
    align-items: center;
    justify-content: center;     
`;

export const TitleModule = styled.Text`
    font-size: 18px;
    font-family: 'montserrat-semibold';
    text-align: center;
    align-items: center;
    margin-left: 5px;    
`;