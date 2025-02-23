import styled from 'styled-components/native';
import { Image } from 'react-native';

export const Container = styled.View`
    flex: 1;
    padding-top: 20px;
    background: #fff;
`;

export const PerfilArea = styled.View`
  height: 180px;
  width: 100%;
`;

export const Profile = styled.View`
  flex: 1;
  background: #fff;
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
`;

export const PerfilPhotoContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const PerfilPhoto = styled.View`
  width: 125px;
  height: 125px;
  border-radius: 50%;
  background: #cecece;
  position: relative;
  overflow: hidden;
`;

export const Body = styled.View`
  flex: 1;
  width: 100%;
`;

export const PerfilContent = styled.View`
  height: 100%;
  align-items: center;
  padding-bottom: 20px;
`;

export const Photo = styled(Image).attrs({
  resizeMode: 'cover'  
})`
  width: 100%;
  height: 100%;
`;

export const UploadFileButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
  overflow: hidden;
  position: absolute;
  right: -20px;
  bottom: 0px;
  elevation: 5;
  flex: 1;
  align-items: center;
  justify-content: center;  
`;

export const ProfileName = styled.Text`
  text-align: start;
  font-size: 16px;
  font-family: 'montserrat-semibold';
  margin-top: 25px;
`;

export const ProfileNameSubtitle = styled.Text`
  text-align: start;
  font-size: 14px;
  font-family: 'montserrat-medium';
`;

export const ToolsArea = styled.View`
  flex-direction: row;
  margin: 20px;
  gap: 20px;
`;

export const TabButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-radius: 50px;
  border: 1px solid;
  border-color: #fff;
`;

export const TabButtonLabel = styled.Text`
  font-size: 14px;
  font-family: 'montserrat-medium';
  color: #fff;
`;