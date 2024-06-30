import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
//Routes
import Routes from './src/routes';

export default function App() {
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
