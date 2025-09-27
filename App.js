import { StatusBar } from 'expo-status-bar';
import * as Application from 'expo-application';
import { NavigationContainer } from '@react-navigation/native';
//Components
import LoadingPage from './src/components/LoadingPage';
import { SafeAreaView } from 'react-native-safe-area-context';
//Hooks
import { useFonts } from 'expo-font';
import { useForceUpdate } from './src/hooks/useForceUpdate';
//Routes
import Routes from './src/routes';
//Redux
import { Provider } from 'react-redux';
import { store } from './store';
//Context
import { LoadingProvider } from './src/contexts/LoadingContext';

const URL = process.env.EXPO_PUBLIC_API_URL;

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

  const { loading } = useForceUpdate({
    apiUrl: `${URL}/app/version/`
  });  

  if(!fontsLoaded || loading){
    return (
      <LoadingPage backgroundColor={'#046b5b'}/>
    )
  }

  return (
    <Provider store={store}>
        <LoadingProvider>
          <NavigationContainer>
            <StatusBar
              backgroundColor="#FFFFFF"
              barStyle="dark-content"
            />
            <Routes/>
          </NavigationContainer>
        </LoadingProvider>
    </Provider>
  );
}


// eas build --platform android --profile preview

// eas build --platform ios
// eas submit -p ios

// eas init

// certificado mobileprofision https://developer.apple.com/account/resources/profiles/list

// npx expo start --go