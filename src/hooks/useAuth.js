import React, { useEffect, useState } from 'react';
//Hooks
import { useSelector } from 'react-redux';

const userAuth = () => {

    const [ auth, setAuth ] = useState(false);
    const { userAuth } = useSelector((state) => state.auth);

    useEffect(()=>{
        if(userAuth){
            setAuth(true);
        } else {
            setAuth(false);
        }

    }, [userAuth]);

    return {
        auth
    };

};

export default userAuth;