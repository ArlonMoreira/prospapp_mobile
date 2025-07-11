import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { list } from '../../slices/registerPointSlice';
// Navegação
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Páginas e componentes
import Register from './Register';
import Justify from './Justify';
import LoadingPage from '../../components/LoadingPage';
import Alert from '../../components/Alert';
// Hook customizado
import useReduxAlert from '../../hooks/useReduxAlert';

const Stack = createNativeStackNavigator();

const Point = ({ route }) => {
  const dispatch = useDispatch();
  const { loading, errorMessage, errorMessageJustify } = useSelector(state => state.registerPoint);

  const [color, setColor] = useState(null);
  const [local, setLocal] = useState(null);
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    setColor(route.params.color);
    setLocal(route.params.data);
    setLogo(route.params.logo);
  }, []);

  useEffect(() => {
    if (local) dispatch(list(local.id));
  }, [local]);

  // Usando o hook customizado
  const [showAlertError, setShowAlertError] = useReduxAlert(errorMessage);
  const [showAlertErrorJustify, setShowAlertErrorJustify] = useReduxAlert(errorMessageJustify);

  return (
    <>
      {
        loading ? <LoadingPage backgroundColor={color} logo={logo}/> : (
          <>
            {showAlertError && <Alert message={errorMessage} setShow={setShowAlertError} />}
            {showAlertErrorJustify && <Alert message={errorMessageJustify} setShow={setShowAlertErrorJustify} />}
            <Stack.Navigator>
              <Stack.Screen
                name="Register"
                component={Register}
                initialParams={{ local, color }}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Justify"
                component={Justify}
                initialParams={{ local, color }}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </>
        )
      }
    </>
  );
}

export default Point;
