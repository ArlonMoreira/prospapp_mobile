import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//Components
import LoadingPage from './src/components/LoadingPage';
//Hooks
import { useFonts } from 'expo-font';
//Routes
import Routes from './src/routes';
//Redux
import { Provider } from 'react-redux';
import { store } from './store';
//Context
import { LoadingProvider } from './src/contexts/LoadingContext';

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
      <LoadingPage backgroundColor={'#fff'}/>
    )
  }  

  return (
    <Provider store={store}>
      <LoadingProvider>
        <NavigationContainer>
          <StatusBar 
            translucent
            backgroundColor="transparent"
            style="light"
            barStyle="light-content"
          />
          <Routes/>
        </NavigationContainer>
      </LoadingProvider>
    </Provider>
  );
}


// eas build --platform android --profile preview