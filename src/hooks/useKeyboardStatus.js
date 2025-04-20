import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardStatus = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const onKeyboardDidShow = (e) => setKeyboardVisible(true);
    const onKeyboardDidHide = (e) => setKeyboardVisible(false);

    const showListener = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const hideListener = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
    
  }, []);

  return keyboardVisible;

};

export default useKeyboardStatus;