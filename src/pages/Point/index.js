import React, { useEffect, useState } from 'react'
//Redux
import { list, resetErrorMessage } from '../../slices/registerPointSlice';
//Hooks
import { useSelector, useDispatch } from 'react-redux';
//Pages
import Register from './Register';
import Justify from './Justify';
//Components
import LoadingPage from '../../components/LoadingPage';
import Alert from '../../components/Alert';
//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Point = ({ route }) => {

  const dispatch = useDispatch();
  const { loading, errorMessage } = useSelector(state => state.registerPoint);

  const [ color, setColor ] = useState(null);
  const [ local, setLocal ] = useState(null);
  const [ logo, setLogo ] = useState(null);

  useEffect(() => {
    setColor(route.params.color);
    setLocal(route.params.data);
    setLogo(route.params.logo);

  }, []);

  useEffect(() => {
    if(local) dispatch(list(local.id));
  }, [local]);

  //Alert mensagem
  const [showAlertError, setShowAlertError] = useState(false);

  //Apresentar o alert caso tiver mensagem de erro.
  useEffect(()=>{
    if(errorMessage){
      setShowAlertError(true);
    } else {
      setShowAlertError(false);
    }

  }, [errorMessage, setShowAlertError]);

  //Fechar a mensagem de erro automaticamente.
  useEffect(()=>{
    if(!showAlertError){ //Resetar o estado de errorMessage caso não tiver mais visível o alerta.
      dispatch(resetErrorMessage());
    } else { //Caso estiver aberto a mensagem de erro, 1 segundo depois será fechada sozinha.
      const timeoutClearMessage = setTimeout(()=>{
        dispatch(resetErrorMessage());
      }, 6000);

      return () => {
        clearTimeout(timeoutClearMessage);
      }

    }

  }, [showAlertError]);    

  return (
    <>
      {
        loading ? <LoadingPage backgroundColor={color} logo={logo}/> : (
          <>
            {
              showAlertError && <Alert message={errorMessage} setShow={setShowAlertError}/>
            }  
            <Stack.Navigator>
              <Stack.Screen
                name="Register"
                component={Register}
                initialParams={{
                  local,
                  color
                }}
                options={{
                  headerShown: false,
                }}               
              />
              <Stack.Screen
                name="Justify"
                component={Justify}
                initialParams={{
                  local,
                  color
                }}
                options={{
                  headerShown: false,
                }}               
              />              
            </Stack.Navigator>                        
          </>      
        )
      }
    </>   
  )
}

export default Point;