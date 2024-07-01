import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//Hooks
import { useFonts } from 'expo-font';
//Routes
import Routes from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  if(!fontsLoaded){
    return (
      <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F0F4FF'
          }}
        >
        <ActivityIndicator size="large" color="#131313"/>
      </View>
    )
  }  

  return (
    <NavigationContainer>
      <StatusBar 
        translucent
        backgroundColor="transparent"
        style="light"
        barStyle="light-content"/>
      <Routes/>
    </NavigationContainer>
  );
}
