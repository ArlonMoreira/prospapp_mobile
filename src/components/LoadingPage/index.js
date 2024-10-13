import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingPage = () => {
  return (
    <View
        style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F4FF',
        }}
    >
        <ActivityIndicator size="large" color="#131313" />
    </View>
  )
}

export default LoadingPage;