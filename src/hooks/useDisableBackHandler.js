import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useDisableBackHandler = () => {
    
  useEffect(() => {
    const backAction = () => true; // retorna true para bloquear o botão de voltar

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();

  }, []);

};

export default useDisableBackHandler;