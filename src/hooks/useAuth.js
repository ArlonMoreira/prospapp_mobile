import { useEffect, useState } from 'react';
//Hooks
import { useSelector } from 'react-redux';

const userAuth = () => {
    //Automaticamente quando userAuth for atualizado, irá identificar como sendo autenticado ou não;
    const [ auth, setAuth ] = useState(true);
    const { userAuth, recoverPassword } = useSelector((state) => state.auth);

    // useEffect(()=>{
    //     if(userAuth && !recoverPassword){
    //         setAuth(true);
    //     } else {
    //         setAuth(false);
    //     }

    // }, [userAuth]);

    return {
        auth, recoverPassword
    };

};

export default userAuth;