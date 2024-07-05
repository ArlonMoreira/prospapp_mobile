import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//Hooks
import { useFonts } from 'expo-font';
//Routes
import Routes from './src/routes';
//Redux
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {

  const [fontsLoaded] = useFonts({
    'montserrat-black': require('./assets/fonts/Montserrat-Black.ttf'),
    'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'montserrat-extrabold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
    'montserrat-extralight': require('./assets/fonts/Montserrat-ExtraLight.ttf'),
    'montserrat-light': require('./assets/fonts/Montserrat-Light.ttf'),
    'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-semibold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'montserrat-medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'montserrat-thin': require('./assets/fonts/Montserrat-Thin.ttf'),
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
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar 
          translucent
          backgroundColor="transparent"
          style="light"
          barStyle="light-content"/>
        <Routes/>
      </NavigationContainer>
    </Provider>
  );
}
