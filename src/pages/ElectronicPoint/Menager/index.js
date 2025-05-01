import React, { useEffect } from 'react';
//Components
import BoxAction from '../../../components/BoxAction';
//Hooks
import { useNavigation, useNavigationState } from '@react-navigation/native';
//Pages
import ListLocals from './ListLocals';
import RemoveLocals from './RemoveLocals';
import EditLocals from './EditLocals';
//Routes
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Styles
import { ToolsArea } from '../../ElectronicCall/styles';

const Stack = createNativeStackNavigator();

const Menager = ({primaryColor, locals}) => {

  const navigation = useNavigation(); 

  const currentRouteName = useNavigationState((state) => {
    const parentRoute = state.routes[state.index];

    if(parentRoute.state){
      const subRoute = parentRoute.state.routes[parentRoute.state.index];
      return subRoute.name;

    } 

    return parentRoute.name;

  });
  
  return (
    <>
      <ToolsArea>
        <BoxAction
          color={primaryColor}
          iconName={'add-circle'}
          title={'Adicionar Local'}
        />
        <BoxAction
          color={currentRouteName == 'ListLocals' ? '#f0f2f5': primaryColor}
          backgroundColor={currentRouteName !== 'ListLocals' ? '#f0f2f5': primaryColor}
          iconName={'alarm-sharp'}
          action={() => navigation.navigate('ListLocals')}
          title={'Registar ponto'}
        />
        <BoxAction
          color={currentRouteName == 'EditLocals' ? '#f0f2f5': primaryColor}
          backgroundColor={currentRouteName !== 'EditLocals' ? '#f0f2f5': primaryColor}
          iconName={'pencil-sharp'}
          action={() => navigation.navigate('EditLocals')}
          title={'Editar Local'}
        />
        <BoxAction
          color={currentRouteName == 'RemoveLocals' ? '#f0f2f5': primaryColor}
          backgroundColor={currentRouteName !== 'RemoveLocals' ? '#f0f2f5': primaryColor}
          iconName={'close-circle'}
          action={() => navigation.navigate('RemoveLocals')}
          title={'Remover Local'}
        />                   
      </ToolsArea>
      <Stack.Navigator>
        <Stack.Screen
          name="ListLocals"
          component={ListLocals}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditLocals"
          component={EditLocals}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RemoveLocals"
          component={RemoveLocals}
          options={{
            headerShown: false,
          }}
        />                
      </Stack.Navigator>      
    </>
  )

}

export default Menager;