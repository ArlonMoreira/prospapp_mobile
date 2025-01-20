import styled from 'styled-components/native';
import { Image } from 'react-native';

export const Container = styled.KeyboardAvoidingView`
  flex:1;
  align-items: center;
  justify-content: center;
`;

export const PerfilArea = styled.View`
  height: 360px;
  width: 100%;
`;

export const Profile = styled.View`
  flex: 1;
  background: #fff;
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
`;

export const Body = styled.View`
  flex: 1;
  width: 100%;
`;

export const PerfilContent = styled.View`
  height: 245px;
  align-items: center;
`;

export const PerfilPhotoContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #fff;
`;

export const PerfilPhoto = styled.View`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #cecece;
  position: relative;
  overflow: hidden;
`;

export const Photo = styled(Image).attrs({
  resizeMode: 'cover'    
})`
  width: 100%;
  height: 100%;
`;

export const UploadFileButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fff;
  overflow: hidden;
  position: absolute;
  right: -20px;
  bottom: 20px;
  elevation: 5;
  flex: 1;
  align-items: center;
  justify-content: center;  
`;

export const ProfileName = styled.Text`
  text-align: start;
  font-size: 16px;
  font-family: 'montserrat-semibold';
  margin-top: 10px;
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