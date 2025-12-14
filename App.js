import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
//Components
import LoadingPage from './src/components/LoadingPage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
//Hooks
import { useFonts } from 'expo-font';
import { useForceUpdate } from './src/hooks/useForceUpdate';
import { useEffect } from 'react';
//Routes
import Routes from './src/routes';
//Redux
import { Provider } from 'react-redux';
import { store } from './store';
//Context
import { LoadingProvider } from './src/contexts/LoadingContext';

const URL = 'https://www.prosperefisio.com.br/prospapp';//process.env.EXPO_PUBLIC_API_URL;

export default function App() {

  useEffect(() => {
    NavigationBar.setPositionAsync('relative'); // impede barra flutuante
    NavigationBar.setBackgroundColorAsync('#ffffff');
  }, []);

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
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={['bottom', 'left', 'right']}>
          <Provider store={store}>
              <LoadingProvider>
                <NavigationContainer>
                  <StatusBar
                    backgroundColor="#ffffffff"
                    barStyle="dark-content"
                  />
                  <Routes/>
                  {/* {
                    Platform.OS === "android" && (<View style={{ paddingBottom: 40 }}></View>)
                  }  */}
                </NavigationContainer>
              </LoadingProvider>
          </Provider>          
        </SafeAreaView>
      </SafeAreaProvider>
  );
}


// eas build --platform android --profile preview

// eas build --platform ios
// eas submit -p ios

// eas init

// certificado mobileprofision https://developer.apple.com/account/resources/profiles/list

// npx expo start --go