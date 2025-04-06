import React from 'react';
import { View, ActivityIndicator } from 'react-native';
//Styles
import { Logo, LogoContainer } from './styles';
import { StatusBar } from 'expo-status-bar';

const LoadingPage = ({backgroundColor, logo}) => {
  return (     
    <View
        style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
        }}
    > 
      <StatusBar 
        translucent
        backgroundColor="transparent"
        style="light" 
      />      
      {
        logo && (
          <LogoContainer>
            <Logo source={{uri: logo}}/>
          </LogoContainer>
        ) 
      }
      <ActivityIndicator size="large" color="#fff" />
    </View>
  )
}

export default LoadingPage;