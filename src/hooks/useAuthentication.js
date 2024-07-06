import React from 'react';

const URL = process.env.EXPO_PUBLIC_API_URL;

const useAuthentication = () => {

    const login = async(data) => {
  
        try {
            const response = await fetch(`${URL}user/signin/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            const request = {
                success: response.ok,
                ...result
            };

            return request;

        } catch(error){
            return {
                success: false,
                message: 'Falha de comunicação com o servidor.'
            };
        }

    };

    return {
        login
    };

};

export default useAuthentication;